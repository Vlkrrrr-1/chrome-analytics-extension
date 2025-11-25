import { clearEvents, getAllEvents, type EventRecord } from "../services/db";

export async function deleteAllData(): Promise<void> {
  if (
    confirm(
      "Are you sure you want to delete all data? This action cannot be undone."
    )
  ) {
    await clearEvents();
    window.location.reload();
  }
}

export async function exportSessionsCSV(): Promise<void> {
  const events = await getAllEvents();

  if (!events || events.length === 0) {
    alert("No data available for export");
    return;
  }

  const csv = convertToCSV(events);
  downloadFile(csv, "analytics_events.csv", "text/csv;charset=utf-8;");
}

export async function exportSessionsJSON(): Promise<void> {
  const events = await getAllEvents();

  if (!events || events.length === 0) {
    alert("No data available for export");
    return;
  }

  const json = convertToJSON(events);
  downloadFile(
    json,
    "analytics_events.json",
    "application/json;charset=utf-8;"
  );
}

function convertToCSV(data: EventRecord[]): string {
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((field) => {
          const value = (row as any)[field] ?? "";
          const stringValue =
            typeof value === "object"
              ? JSON.stringify(value)
              : value.toString();
          return `"${stringValue.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ];
  return csvRows.join("\n");
}

function convertToJSON(data: EventRecord[]): string {
  return JSON.stringify(data, null, 2);
}

function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.click();

  URL.revokeObjectURL(url);
}
