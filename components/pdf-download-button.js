"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import ReactMarkdown from "react-markdown";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export function ResumePDF({ content }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <ReactMarkdown
            components={{
              p: ({ children }) => <Text style={styles.text}>{children}</Text>,
              h1: ({ children }) => (
                <Text
                  style={[styles.text, { fontSize: 24, fontWeight: "bold" }]}
                >
                  {children}
                </Text>
              ),
              h2: ({ children }) => (
                <Text
                  style={[styles.text, { fontSize: 18, fontWeight: "bold" }]}
                >
                  {children}
                </Text>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </View>
      </Page>
    </Document>
  );
}

export function PDFDownloadButton({ resumeContent }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!resumeContent) {
      console.error("Resume content is not available");
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await pdf(<ResumePDF content={resumeContent} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setIsGenerating(false);
  };

  return (
    <Button onClick={generatePDF} disabled={isGenerating || !resumeContent}>
      {isGenerating ? "Generating PDF..." : "Download PDF"}
    </Button>
  );
}
