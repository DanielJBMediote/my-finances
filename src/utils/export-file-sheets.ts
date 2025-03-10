import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export function exportToXLSX<TData = []>(jsonData: TData, fileName = "data.xlsx") {
  if (!Array.isArray(jsonData)) throw new Error("JsonData must be an array")
   
  // Criar um novo livro de trabalho
  const workbook = XLSX.utils.book_new();

  // Converter JSON em uma planilha
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Adicionar a planilha ao livro de trabalho
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Criar um arquivo Excel a partir do workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Criar um blob e salvar o arquivo
  const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(data, fileName);
};
