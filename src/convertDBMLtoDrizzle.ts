interface TableColumn {
  name: string;
  type: string;
  properties: string[] | null;
}

interface Table {
  name: string;
  columns: TableColumn[];
}


const convertDBMLtoDrizzle = (dbmlCode: string): string => {
  const lines = dbmlCode.split("\n").map((line) => line.trim());

  const tables: Table[] = [];
  let currentTable: Table | null = null;

  for (const line of lines) {
    if (line.startsWith("Table")) {
      const tableName = line.substring(line.indexOf(" ") + 1, line.indexOf("{")).trim();
      currentTable = {
        name: tableName,
        columns: [],
      };
    } else if (line.includes("[")) {
      const columnName = line.substring(0, line.indexOf(" ")).trim();
      const columnType = line.substring(line.indexOf(" ") + 1, line.indexOf("[")).trim();
      const columnProperties = line
        .substring(line.indexOf("[") + 1, line.indexOf("]"))
        .split(",")
        .map((property) => property.trim());
      if (currentTable) {
        currentTable.columns.push({
          name: columnName,
          type: columnType,
          properties: columnProperties.length > 0 ? columnProperties : null,
        });
      }
    } else if (line.includes("(") && line.includes(")")) {
      const columnName = line.substring(0, line.indexOf(" ")).trim();
      const columnType = line.substring(line.indexOf(" ") + 1, line.indexOf("(")).trim();
      const columnLength = line.substring(line.indexOf("(") + 1, line.indexOf(")")).trim();
      if (currentTable) {
        currentTable.columns.push({
          name: columnName,
          type: columnType,
          properties: [`length: ${columnLength}`],
        });
      }
    } else if (line === "}") {
      if (currentTable) {
        tables.push(currentTable);
        currentTable = null;
      }
    }
  }

  let drizzleCode = "";

  for (const table of tables) {
    drizzleCode += `export const ${table.name} = pgTable("${table.name}", {\n`;

    for (const column of table.columns) {
      const columnName = column.name;
      const columnType = column.type;
      const columnProperties = column.properties;

      if (columnProperties) {
        drizzleCode += `  ${columnName}: ${columnType}("${columnName}", { ${columnProperties.join(", ")} }).notNull(),\n`;
      } else {
        drizzleCode += `  ${columnName}: ${columnType}("${columnName}").notNull(),\n`;
      }
    }

    drizzleCode += "});\n\n";
  }

  return drizzleCode;
};

export default convertDBMLtoDrizzle;
