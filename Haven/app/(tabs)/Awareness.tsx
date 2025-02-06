
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useFonts } from 'expo-font';

const Kavach = () => {
  // Sample data for stories and FAQs
  const stories = [
    {
      title: "Sandhya Wankhede v. Manoj Bhimrao Wankhede (2011)",
      excerpt: "A landmark case on domestic violence and women's rights.",
      content: `In the case of Sandhya Wankhede v. Manoj Bhimrao Wankhede, after getting married in 2005, the Appellant Sandhya lived with R1, R2, and R3 for nearly a year, which caused problems in her marriage. 
She filed a police report against her husband under Section 498A of the Indian Penal Code for assaulting her. She also filed an application against all three Respondents, which the First Class Judicial Magistrate granted, directing R1 to pay the monthly maintenance. All Respondents were also barred from trying to evict the Complainant from her matrimonial home. The Supreme Court resolved the question by ruling that the provision to Section 2(q) doesn't exclude female relatives of the husband from the scope of a complaint that can be submitted under the Domestic Violence Act.`,
    },
    {
      title: "V.D. Bhanot v. Savita Bhanot (2012)",
      excerpt: "A case addressing the retrospective applicability of the Domestic Violence Act, 2005.",
      content: `The parties in this case got married on 23rd August 1980, and on 4th July 2005, the Respondent (wife) was driven out of her matrimonial home. 
Thereafter, the Respondent filed a petition to the Magistrate under Section 12 of the DV Act. The Magistrate granted interim relief of Rs 6000 to the wife and subsequently passed a protection/residence order under Section 18 and 19 of the DV Act protecting the right of the Respondent wife to reside in her matrimonial home in Mathura. 
The Supreme Court agreed with the reasoning given by the HC and held that even if a wife, who had shared a household in the past but was no longer doing so when the Act came into force, would still be entitled to the protection of the Domestic Violence Act, 2005. The Court ordered the petitioner to furnish her with an appropriate portion of his house as well as Rs 10,000 per month for her maintenance.`,
    },
    {
      title: "Bibi Parwana Khatoon v. State of Bihar (2017)",
      excerpt: "A case concerning dowry death and common intention.",
      content: `In this case, a woman was killed by being set on fire by her husband and family, according to the circumstances. A case was filed against the husband and his family, in which the district court and the High Court ruled against them. The victim’s sister-in-law and brother-in-law appealed the conviction to the Supreme Court.
After reviewing the evidence, the bench concluded that the lower courts erred in determining that the charge under Section 304B read with Section 34 of the Indian Penal Code, 1860, held against the appellants. The Court found that there was no proof of a common intention between the appellants and the deceased's spouse in committing the crime, as the appellants resided in a separate village and lacked evidence of involvement.`,
    },
    {
      title: "Kamlesh Devi v. Jaipal and Ors., (2019)",
      excerpt: "A case involving allegations of domestic violence and shared residence.",
      content: `In this case, the petitioner Kamlesh Devi stated that she and the Respondents are family members of the same family and they’ve been residing in the same premises for a long time. The petitioner’s husband is a former BSF officer, and she has three kids, Urmila, Anusaya, and Gaytri. Anusaya and Gaytri are the petitioner’s unmarried daughters who attend Krishna Nagar College for their education. 
Furthermore, Respondents have formed a gang and are quarrelsome individuals, and whenever the Petitioner’s daughters, Anusaya and Gaytri, went to their college, Respondents Jaipal, Krishan Kumar, and Sandeep followed them and taunted them, as well as engaged them in obscene behaviour.
Sube Singh, the petitioner’s husband, also filed a complaint with the Sarpanch of Village Gaud against the Respondents, after which the Respondents apologized in writing on 5.8.2008 in the presence of respected members of the village. They then returned to normalcy for a short period of time before resuming their obscene behaviour. As a result, having exhausted all other options for protection from domestic abuse, the complaint was filed. 
After examining the provisions of the Act, the Trial Court determined that none of the witnesses on record demonstrated any fact to the effect that the Respondents and the petitioner were living in a shared home and that the Respondents had committed domestic violence against them. 
The Supreme Court said that the High Court correctly concluded that the elements of domestic violence were completely missing in this case. The petitioner and Respondents are not residing in the same residence together. The responders are allegedly family members, according to a vague accusation. There isn’t even a murmur between the Respondents and the petitioner. They seem to be neighbours. Hence, the special leave petition was denied.`,
    },
    {
      title: "Ajay Kumar v. Lata @ Sharuti, (2019)",
      excerpt: "A case involving allegations of domestic violence and shared residence.",
      content: "The Appellant Lata is the Respondent's brother-in-law, i.e., his brother's widow. They lived together in a Hindu Joint Family Property. The lawsuit filed in the Supreme Court, there seem to be no rules in the Act that requires the Appellant to pay maintenance to the Brother's wife. Only if they were in a business partnership would he be obligated to pay the maintenance. Section 12(1) of the DV Act states that a person may approach a magistrate for relief or financial relief to compensate for loss sustained by her or her child as a result of domestic violence, however, this does not include the order of maintenance under Section 125 of the Code of Criminal Procedure or any other law. The lady said that after her husband died, she was not permitted to dwell in her matrimonial house and was driven out with her kid, and she now has no means of support for herself and her child.                                                                                                Whether brother-in-law comes under the definition of 'Respondent' under Section 2(q) of the DV Act? Judgement given by the Court. In this case, the Supreme Court ruled that under the Domestic Violence Act, 2005, maintenance to a widow can also be provided by a brother-in-law. The Supreme Court rejected the Appellant's allegation that Section 2(q)",
    },
  ];

  const faqs = [
    { question: "How can I file a complaint before the National Commission for Women?", answer: "Domestic violence includes physical, emotional, sexual, and economic abuse within a household." },
    { question: "Who can file a complaint before the National Commission for Women?", answer: "Signs include controlling behavior, isolation, threats, and physical harm." },
    { question: "What Category of complaints are entertained by the National Commission for Women?", answer: "Contact local helplines, authorities, or trusted organizations for support." },
    { question: "What complaints are not entertained by the National Commission for Women?", answer: "Offer a listening ear, provide resources, and encourage them to seek professional help." },
    { question: "How can I check the status of my complaint?", answer: "Yes, domestic violence can happen to anyone, regardless of gender, age, or background." },
    { question: "When can I contact NCW?", answer: "Yes, domestic violence can happen to anyone, regardless of gender, age, or background." },
    { question: "What all information do I need to provide while filing a complaint?", answer: "Yes, domestic violence can happen to anyone, regardless of gender, age, or background." },
    { question: "If I am being deprived of the benefit of the Maternity Benefit Act, 1961 can I file a complaint with the National Commission for Women?", answer: "Yes, domestic violence can happen to anyone, regardless of gender, age, or background." },
    { question: "How can a woman inquire about compensation after winning a harassment case?", answer: " A woman can inquire about compensation by contacting the State Legal Services Authority or the District Legal Services Authority. She can apply with necessary documents like incident details and medical reports." },
  ];

  // State to manage expanded story and FAQ items
  const [expandedStory, setExpandedStory] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <ScrollView style={styles.container}>
      {/* Stories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stories</Text>
        {stories.map((story, index) => (
          <View key={index} style={styles.storyCard}>
            <Text style={styles.storyTitle}>{story.title}</Text>
            <Text style={styles.storyExcerpt}>{story.excerpt}</Text>
            {expandedStory === index && <Text style={styles.storyContent}>{story.content}</Text>}
            <TouchableOpacity onPress={() => setExpandedStory(expandedStory === index ? null : index)}>
              <Text style={styles.readMore}>{expandedStory === index ? "Read Less" : "Read More"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => setExpandedFAQ(expandedFAQ === index ? null : index)}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
            </TouchableOpacity>
            {expandedFAQ === index && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.helplineContainer}>
        <Text style={styles.footerText}>If you or someone you know is experiencing domestic violence, reach out for help now.</Text>
        <View style={styles.helplineBox}>
          <Text style={styles.helpline}>Helpline: 8793-088-814</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#373F51', padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 24, fontWeight: '700', color: 'white', marginBottom: 16, textAlign: 'center', textDecorationLine: 'underline' },
  storyCard: { backgroundColor: '#ffffff', padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginLeft: 10, marginRight: 10 },
  storyTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  storyExcerpt: { fontSize: 16, color: '#555', marginVertical: 8 },
  storyContent: {  fontSize: 16, color: '#555', marginTop: 8, lineHeight: 20 },
  readMore: { fontSize: 14, color: '#8B183F', marginTop: 8, fontWeight: '500' },
  faqItem: { backgroundColor: '#f9f9f9', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e0e0e0', marginLeft: 10, marginRight: 10 },
  faqQuestion: {  fontSize: 16, fontWeight: '600', color: '#333' },
  faqAnswer: { fontSize: 14, color: '#555', marginTop: 8, lineHeight: 20 },
  footer: { backgroundColor: '#3d6af9', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  helplineContainer: { backgroundColor: 'white', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10 },
  footerText: {  fontSize: 16, color: '#000', marginBottom: 8, textAlign: 'center' },
  helplineBox: { backgroundColor: '#8B183F', padding: 16, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, marginTop: 8 },
  helpline: { fontSize: 16, fontWeight: '700', color: '#fff' },
});

export default Kavach;
