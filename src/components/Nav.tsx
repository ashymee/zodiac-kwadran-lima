import useHandler from "@/utils/useHandler";
import useStores from "@/utils/useStores";

const Nav = () => {
  const { tabs } = useHandler();
  const { activeTab, setActiveTab } = useStores();

  return (
    <nav>
      {tabs.map((item, index) => (
        <button
          key={index}
          className={`btn-tab ${item === activeTab ? "active" : "inactive"}`}
          onClick={() => setActiveTab(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
