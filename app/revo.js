document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.querySelector("revo-grid");
  console.log("RevoGrid loaded Successfully");

  const module = "Leads";

  const columns = [];
  const rows = [];

  getMetaData(module).then((response) => {
    response.fields.forEach((metaField) => {
      if (!metaField.api_name.startsWith("$")) {
        const tempObj = {};
        tempObj["prop"] = metaField.api_name;
        tempObj["name"] = metaField.display_label;
        tempObj["autoSizeColumn"] = true;
        tempObj["sortable"] = true;
        tempObj["order"] = "asc";
        tempObj["filter"] = true;
        // tempObj["editor"] = "select";
        if (metaField.data_type === "datetime") {
          console.log(metaField)
        }
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

  getData(module).then((response) => {
    const data = response.data;
    data.forEach((record) => {
      Object.keys(record).map((field) => {
        if (!field.startsWith("$")) {
          if (record[field]?.hasOwnProperty("name")) {
            record[field] = record[field].name;
          }
        }
      });
      rows.push(record);
    });

    grid.theme = "darkMaterial";
    grid.autoSizeColumn = true;
    grid.resize = true;
    grid.columnTypes = {
      select: new window.RevoGridColumnSelect.CreateSelectColumnType(),
    };
  //   grid.editors = {
  //     'select': customSelect
  // };
    grid.columns = columns;
    grid.source = rows;
  });
});
