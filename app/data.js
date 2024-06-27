const initializeApp = () => {
  return new Promise((resolve, reject) => {
    ZOHO.embeddedApp.on("PageLoad", async function (onloadData) {
      reSizeWidget("100%", "100%")
      resolve(onloadData);
    });
    ZOHO.embeddedApp.init();
  });
};

const reSizeWidget = async (height, width) => {
  try {
    const response = await ZOHO.CRM.UI.Resize({height,width})
  } catch (error) {
    console("Problem occured while resizing widget. See reSizeWidget()")
  }
}

const getData = async (entity) => {
  await initializeApp();
  try {
    const response = await ZOHO.CRM.API.getAllRecords({
      Entity: entity,
      sort_order: "asc",
      per_page: 200,
      page: 1,
    });
    return response
  } catch (error) {
    throw error;
  }
};

const getMetaData = async (Entity) => {
  await initializeApp();
  try {
    const response = await ZOHO.CRM.META.getFields({Entity});
    return response
  } catch (error) {
    throw error;
  }
};
