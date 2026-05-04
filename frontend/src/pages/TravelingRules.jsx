import { useState, useEffect} from "react";
import Header from "../components/travelRules/Header";
import CountryBar from "../components/travelRules/CountryBar";
import Sidebar from "../components/travelRules/Sidebar";
import RuleContent from "../components/travelRules/RuleContent";
import countries from "../data/countries";
import axios from "axios";
import { motion } from "framer-motion";

export default function TravelingRules() {


  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedRule, setSelectedRule] = useState(
    countries[0].rules[0]
  );
  // const filteredCountries = countries.filter((country) =>
  //   country.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredRules = selectedCountry.rules.filter((rule) =>
    rule.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios.get(`/api/rules/${selectedCountry.name}`)
      .then(res => setSelectedRule(res.data));
  },[selectedCountry]); 

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rules/${selectedCountry.name}`)
      .then(res => setRules(res.data));
  }, [selectedCountry]);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
        <Header setSearch={setSearch} />

        <CountryBar
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={(country) => {
            setSelectedCountry(country);
            setSelectedRule(country.rules[0]);
          }}
        />

        <div className="flex">
          <Sidebar
            rules={filteredRules}

            selectedRule={selectedRule}
            setSelectedRule={setSelectedRule}
          />

          <RuleContent rule={selectedRule} />
          
        </div>
      </div>
    </motion.div>
  );
}