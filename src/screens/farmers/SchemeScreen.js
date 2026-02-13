import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import {StateContext} from '../../context/StateContext'; // Adjusted import for the correct path


// Central Schemes URLs
const centralSchemeUrls = [
  'https://agriwelfare.gov.in/en/Major',
  'https://agriwelfare.gov.in/en/FarmWelfare'
];

// State Schemes URLs
const stateSchemeUrls = {
  'Tamil Nadu': [
    'https://www.tn.gov.in/scheme/department_wise/2',
    'https://www.tn.gov.in/scheme/department_wise/2?page=1',
    'https://www.tn.gov.in/scheme/department_wise/2?page=2',
    'https://www.tn.gov.in/scheme/beneficiary_wise'
  ],
  'Andhra Pradesh': [
    'https://vikaspedia.in/schemesall/schemes-for-farmers'
  ],
  'Kerala': [
    'https://keralaagriculture.gov.in/en/schemes/'
  ],
  'Maharashtra': [
    'https://www.maharashtra.gov.in/Site/1604/scheme'
  ],
  'Madhya Pradesh': [
    'https://mpkrishi.mp.gov.in/Englishsite_New/PSY.aspx',
    'https://mpkrishi.mp.gov.in/Englishsite_New/MKSY.aspx',
    'https://mpkrishi.mp.gov.in/Englishsite_New/bhavantar_new.aspx'
  ],
  'Uttar Pradesh': [
    'https://upagripardarshi.gov.in/StaticPages/StateSponsored-CropBreeding-hi.aspx',
    'https://upagripardarshi.gov.in/StaticPages/StateSponsored-soilwater-hi.aspx'
  ],
  'Haryana': [
    'https://agriharyana.gov.in/CenterStateSponsoredSchemes'
  ],
  'Meghalaya': [
    'https://megagriculture.gov.in/PUBLIC/schemes_agriculture.aspx',
    'https://megagriculture.gov.in/PUBLIC/schemes_horticulture.aspx',
    'https://megagriculture.gov.in/PUBLIC/schemes_overviewSch.aspx'
  ],
  'Karnataka': [
    'https://raitamitra.karnataka.gov.in/info-4/Scheme++Details/2022-23++Scheme++Details/en'
  ],
  'Assam': [
    'https://agri-horti.assam.gov.in/schemes'
  ],
  'Himachal Pradesh': [
    'https://agriculture.hp.gov.in/en/scheme_category/state-en/'
  ],
  'Jharkhand': [
    'https://www.jharkhand.gov.in/Home/SearchSchemes'
  ],
  'Jammu and Kashmir': [
    'https://horticulture.jk.gov.in/Schemes.html'
  ],
  'Mizoram': [
    'https://agriculturemizoram.nic.in/pages/rkvy.html',
    'https://agriculturemizoram.nic.in/pages/pkvy.html',
    'https://agriculturemizoram.nic.in/pages/focus.html',
    'https://agriculturemizoram.nic.in/pages/greenag.html'
  ],
  'Nagaland': [
    'https://cmmfi.nagaland.gov.in/',
    'https://hortidept.nagaland.gov.in/movcd-ner'
  ],
  'Telangana': [
    'https://rythubandhu.telangana.gov.in/Default_Home.aspx',
    'https://soilhealth.dac.gov.in/data1/63f871f5c660ddb223457dca/TELANGANA',
    'https://rythubandhu.telangana.gov.in/Default_LIC1.aspx',
    'https://startup.telangana.gov.in/locations/rythu-vedika/'
  ],
  'Odisha': [
    'https://agri.odisha.gov.in/schemes-agriculture/agriculture/KALIA',
    'https://agri.odisha.gov.in/schemes-agriculture/agriculture/BALARAM'
  ],
  'Punjab': [
    'https://www.apnikheti.com/en/pn/govt-schemes-details/rainfed-area-development-programme',
    'https://www.apnikheti.com/en/pn/govt-schemes-details/agriculture-gold-loan',
    'https://www.apnikheti.com/en/pn/govt-schemes-details/national-agricultural-market-scheme-e-nam'
  ],
  'Tripura': [
    'https://agri.tripura.gov.in/programmes-schemes'
  ],
  'Uttarakhand': [
    'https://ukrdd.uk.gov.in/?page_id=4136'
  ],
  'Rajasthan': [
    'https://www.myscheme.gov.in/schemes/zbnf',
    'https://www.myscheme.gov.in/search/state/Rajasthan',
    'https://www.myscheme.gov.in/schemes/nsskvy',
    'https://www.myscheme.gov.in/schemes/gh'
  ],
  'Arunachal Pradesh': [
    'https://www.myscheme.gov.in/schemes/anby',
    'https://www.myscheme.gov.in/schemes/cmamp',
    'https://changlang.nic.in/scheme/cluster-nutritional-kitchen-garden-scheme/',
    'https://dibangvalley.nic.in/cm-flagship-schemes/chief-minister-krishi-rinn-yojna/'
  ],
  'Sikkim': [
    'https://rkvy.nic.in/#',
    'https://sikkim.gov.in/departments/food-security-and-agriculture-development-department/pm-kisan-samman-nidhi'
  ],
  'Goa': [
    'https://www.myscheme.gov.in/schemes/islaaa'
  ],
  'Gujarat': [
    'https://rural.gov.in/en/press-release/mahila-kisan-sashaktikaran-pariyojana',
    'https://krushimahotsav.org/',
    'https://govtjobschemes.com/stipend-scheme-for-poultry-farming-training/',
    'https://doah.gujarat.gov.in/Home/SchemesDetailsPage/Bu2wc90IXRdJKrcfHJ%E2%9C%A49ew%E2%99%AC%E2%99%AC',
    'https://modijikiyojna.com/agr-50-tractor-scheme-gujarat/'
  ],
  'Chhattisgarh': [
    'https://gariaband.gov.in/en/scheme/saur-sujala-yojna/',
    'https://www.myscheme.gov.in/schemes/ksych',
    'https://popularschemes.com/scheme/annapurna-yojna-chhattisgarh'
  ]
};

const SchemesScreen = () => {
  const { state } = useContext(StateContext); // Use the State Context
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        // Central Schemes URLs
        const centralSchemes = centralSchemeUrls.map((url, index) => ({ id: `central-${index}`, title: `Central Scheme ${index + 1}`, url }));

        // State-specific Schemes URLs
        const stateBasedUrls = stateSchemeUrls[state] || [];
        const stateSchemes = stateBasedUrls.map((url, index) => ({ id: `state-${index}`, title: `${state} Scheme ${index + 1}`, url }));

        setSchemes([...centralSchemes, ...stateSchemes]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [state]);

  const handleSchemePress = (url) => {
    Linking.openURL(url);
  };

  const renderSchemeItem = ({ item }) => (
    <TouchableOpacity style={styles.schemeItem} onPress={() => handleSchemePress(item.url)}>
      <Text style={styles.schemeText}>{item.url}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={schemes}
        renderItem={renderSchemeItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  schemeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  schemeText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SchemesScreen;
