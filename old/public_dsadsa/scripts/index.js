/*Настраиваемые параметры для инстанса*/
const ServicesConfig = {
  url: "https://gist.githubusercontent.com/modecrywork/427f419e58130e9b91ad12eb167988cf/raw/82983608f09be778e8a16a3379f58cde53112db6/testdata",
  scheme: SERVICE_SCHEME
}

const  ServicesContent = new StructuredContent(ServicesConfig,".services");
ServicesContent.init(); // инициализируем контент
