import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { decodeData } from '../utils/encryption';
import './pdfExport.css';

// Register fonts for better typography (optional, but improves quality)
// You can add custom fonts later if needed

// Professional CV Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #2563eb',
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    color: '#475569',
    marginBottom: 10,
  },
  contact: {
    fontSize: 9,
    color: '#64748b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 5,
  },
  bio: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
    marginBottom: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 9,
    color: '#475569',
    backgroundColor: '#f1f5f9',
    padding: '4 8',
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#475569',
    fontWeight: 'bold',
  },
  experiencePeriod: {
    fontSize: 9,
    color: '#64748b',
    fontStyle: 'italic',
  },
  experienceLocation: {
    fontSize: 9,
    color: '#64748b',
  },
  experienceDescription: {
    fontSize: 9,
    color: '#334155',
    marginTop: 5,
    lineHeight: 1.4,
  },
  responsibilities: {
    marginTop: 5,
    paddingLeft: 10,
  },
  responsibility: {
    fontSize: 9,
    color: '#475569',
    marginBottom: 3,
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 3,
  },
  projectDescription: {
    fontSize: 9,
    color: '#334155',
    marginBottom: 5,
    lineHeight: 1.4,
  },
  projectTech: {
    fontSize: 8,
    color: '#64748b',
    fontStyle: 'italic',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#94a3b8',
  },
});

// PDF Document Component
const CVPDFDocument = ({ cvData }) => {
  const { personal, skills, experience, projects } = cvData;
  
  // Decrypt sensitive personal information for PDF
  const decryptedPersonal = {
    ...personal,
    email: personal.email ? decodeData(personal.email) : '',
    phoneNumber: personal.phoneNumber ? decodeData(personal.phoneNumber) : '',
    whatsappNumber: personal.whatsappNumber ? decodeData(personal.whatsappNumber) : '',
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{decryptedPersonal.name}</Text>
          <Text style={styles.title}>{decryptedPersonal.title}</Text>
          <View style={styles.contact}>
            {decryptedPersonal.email && <Text>{decryptedPersonal.email}</Text>}
            {decryptedPersonal.phoneNumber && <Text>• {decryptedPersonal.phoneNumber}</Text>}
            {decryptedPersonal.whatsappNumber && decryptedPersonal.whatsappNumber !== decryptedPersonal.phoneNumber && (
              <Text>• WhatsApp: {decryptedPersonal.whatsappNumber}</Text>
            )}
          </View>
        </View>

        {/* Bio */}
        {decryptedPersonal.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.bio}>{decryptedPersonal.bio}</Text>
          </View>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.experienceTitle}>{exp.title}</Text>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.experiencePeriod}>{exp.period}</Text>
                    {exp.location && <Text style={styles.experienceLocation}>{exp.location}</Text>}
                  </View>
                </View>
                {exp.description && (
                  <Text style={styles.experienceDescription}>{exp.description}</Text>
                )}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <View style={styles.responsibilities}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <Text key={respIndex} style={styles.responsibility}>
                        • {resp}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                {project.description && (
                  <Text style={styles.projectDescription}>{project.description}</Text>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <Text style={styles.projectTech}>
                    Technologies: {project.technologies.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
};

// Export function to generate and download PDF
export const generatePDF = (cvData, filename = 'CV.pdf') => {
  const element = document.createElement('a');
  // We'll use PDFDownloadLink component instead
  return null;
};

// Component to render download button
export const PDFDownloadButton = ({ cvData, className = '' }) => {
  if (!cvData) return null;

  const filename = `${cvData.personal?.name?.replace(/\s+/g, '_') || 'CV'}_Resume.pdf`;

  return (
    <PDFDownloadLink
      document={<CVPDFDocument cvData={cvData} />}
      fileName={filename}
      className={`pdf-download-button ${className}`}
    >
      {({ blob, url, loading, error }) => (
        <button 
          className="pdf-download-btn"
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : '📄 Download PDF CV'}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default CVPDFDocument;
