import CurrentStock from "@/components/dashboard/CurrentStock";
import DashboardBanner from "@/components/dashboard/DashboardBanner";
import SalesOverview from "@/components/dashboard/SalesOverview";
import { GetData } from "@/lib/getData";

const Overview = async () => {
  const items = await GetData("items");
  const warehouses = await GetData("warehouse");

  return (
    <>
      <DashboardBanner />
      <SalesOverview />
      <CurrentStock title="Available Stock Items" items={items} />
      {warehouses.map((warehouse, i) => {
        console.log(warehouse.name); // Change `name` based on your actual data field
        return (
          <CurrentStock
            key={i}
            title={`Available Stock Items in ${warehouse.title}`} // Update field here
            items={warehouse.items}
          />
        );
      })}
    </>
  );
};

export default Overview;
