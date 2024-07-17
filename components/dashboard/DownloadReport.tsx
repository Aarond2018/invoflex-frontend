import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Invoice } from "@/types";
import { readableDate, shortDate } from "@/lib/utils";

type Props = {
  report: Invoice[];
};

const styles = StyleSheet.create({
  page: { padding: 50 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: { width: 100 },
  title: { fontSize: 20, marginBottom: 10 },
  subtitle: { fontSize: 10, marginBottom: 10 },
  customerInfo: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, marginBottom: 10 },
  hr: { borderBottom: "1px solid #aaaaaa", marginBottom: 10 },
  table: { width: "100%", marginBottom: 20 },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid #aaaaaa",
    paddingBottom: 10,
  },
  tableRow: { flexDirection: "row", paddingBottom: 10, paddingTop: 10 },
  tableCell: { flex: 1, fontSize: 10 },
  footer: { textAlign: "center", fontSize: 10, marginTop: 20 },
  formatInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "24px",
  },
  tableCellBold: { flex: 1, fontSize: 10, fontWeight: "bold" },
});

export const DownloadReport = ({ report }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo/logo.png" />
      </View>

      <View>
        <Text style={styles.sectionTitle}>Report</Text>
        <View style={styles.hr} />


        <View style={styles.hr} />

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Report Id</Text>
            <Text style={styles.tableCell}>Client</Text>
            <Text style={styles.tableCell}>Date Issued</Text>
            <Text style={styles.tableCell}>Date Due</Text>
            <Text style={styles.tableCell}>Status</Text>
            <Text style={styles.tableCell}>Total Amount</Text>
          </View>

          {report.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item._id}</Text>
              <Text style={styles.tableCell}>{typeof item.addressedTo !== "string" && (item.addressedTo.name)}</Text>
              <Text style={styles.tableCell}>{shortDate(item.createdAt)}</Text>
              <Text style={styles.tableCell}>{shortDate(item.dueDate)}</Text>
              <Text style={styles.tableCell}>{item.status}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.totalAmount)}</Text>
            </View>
          ))}

            <View style={styles.hr} />
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Total: </Text>
              <Text style={styles.tableCell}>{formatCurrency(report.reduce((acc, item) => acc + item.totalAmount, 0))}</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
        </View>

        <Text style={styles.footer}>Powered by InvoFlex.</Text>
      </View>
    </Page>
  </Document>
);

function formatCurrency(amount: number) {
  return `N${amount.toLocaleString()}.00`;
}
