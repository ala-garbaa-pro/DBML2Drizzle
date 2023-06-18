import React from "react";
import Panel from "./Panel";
import convertDBMLtoDrizzle from "./convertDBMLtoDrizzle";

const defaultDBMLCode = `Table users {
  id integer [primary key]
  username varchar(256)
  role varchar(256)
}
`;

const defaulDrizzleCode = `export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    username : varchar("name", { length: 256 }).notNull(),
    role : varchar("email", { length: 256 }).notNull(),
  }
  );
`;
const Container = () => {
  const [editing, setEditing] = React.useState("DBML" || "Drizzle");
  const [codeOfDBML, setCodeOfDBML] = React.useState(defaultDBMLCode);
  const [codeOfDrizzle, setCodeOfDrizzle] = React.useState(defaulDrizzleCode);

  return (
    <div className="flex">
      <Panel setCode={setCodeOfDBML} setEditing={setEditing} title="DBML">
        {codeOfDBML}
      </Panel>
      <Panel setCode={setCodeOfDrizzle} setEditing={setEditing} title="Drizzle">
        {convertDBMLtoDrizzle(codeOfDBML)}
      </Panel>
    </div>
  );
};

export default Container;
