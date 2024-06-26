document.addEventListener("DOMContentLoaded", async () => {
  
  const grid = document.querySelector("revo-grid");
  console.log("revoGrid loaded");

  const columns = [];
  const rows = [];

  getMetaData("Leads").then((response) => {
    response.fields.forEach((metaField) => {
      if (!metaField.api_name.startsWith("$")) {
        const tempObj = {};
        tempObj["prop"] = metaField.api_name;
        tempObj["name"] = metaField.display_label;
        tempObj["autoResize"] = true;

        if (metaField.data_type === "picklist") {
          const tempArr = [];
          tempObj["columnType"] = "select";
          tempObj["source"] = tempArr;
          metaField.pick_list_values.map((prop) => {
            tempArr.push(prop.display_value);
          });
        }
        columns.push(tempObj);
      }
    });
  });

  getData("Leads").then((response) => {
    const data = response.data;
    data.forEach((leadRecord) => {
      Object.keys(leadRecord).map((field) => {
        if (!field.startsWith("$")) {
          if (leadRecord[field]?.hasOwnProperty("name")) {
            leadRecord[field] = leadRecord[field].name;
          }
        }
      });
      rows.push(leadRecord);
    });
    grid.columnTypes = {
      select: new window.RevoGridColumnSelect.CreateSelectColumnType(),
    };
    grid.autoResize = true;
    grid.resize = true;
    grid.columns = columns;
    grid.source = rows;
  });
});
