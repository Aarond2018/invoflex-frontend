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
import { readableDate } from "@/lib/utils";

type Props = {
  invoice: Invoice;
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

export const DownloadPdf = ({ invoice }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src="/logo/logo.png" />
        <View>
          {typeof invoice.createdBy !== "string" && (
            <>
              <Text style={styles.subtitle}>
                {invoice.createdBy.businessName}
              </Text>
              <Text style={styles.subtitle}>{invoice.createdBy.email}</Text>
            </>
          )}
        </View>
      </View>

      <View>
        <Text style={styles.sectionTitle}>Invoice</Text>
        <View style={styles.hr} />

        <View style={styles.formatInfo}>
          <View style={styles.customerInfo}>
            <Text style={styles.subtitle}>Invoice Id: {invoice._id}</Text>
            <Text style={styles.subtitle}>
              Invoice Date: {readableDate(invoice.createdAt)}
            </Text>
            <Text style={styles.subtitle}>
              Invoice Due: {readableDate(invoice.dueDate)}
            </Text>
          </View>
          <View>
            {typeof invoice.addressedTo !== "string" && (
              <>
                <Text style={styles.subtitle}>{invoice.addressedTo?.name}</Text>
                <Text style={styles.subtitle}>{invoice.addressedTo?.email}</Text>
                <Text style={styles.subtitle}>
                  {invoice.addressedTo?.address}
                </Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.hr} />

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Index</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Rate</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Line Total</Text>
          </View>

          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{formatCurrency(item.rate)}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>
                {formatCurrency(item.rate * item.quantity)}
              </Text>
            </View>
          ))}

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCellBold}>Subtotal</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(invoice.totalAmount)}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}>Tax</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}>{invoice.taxApplied}%</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCellBold}>Total Amount</Text>
            <Text style={styles.tableCell}></Text>
            <Text style={styles.tableCellBold}>
              {formatCurrency(invoice.totalAmount)}
            </Text>
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
