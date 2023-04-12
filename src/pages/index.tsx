import Form from "@/components/Form";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import SubmittedForm from "@/components/SubmittedForm";
import ZodiacList from "@/components/ZodiacList";
import useStores from "@/utils/useStores";
import { Fragment } from "react";

const Home = () => {
  const { activeTab, isValid } = useStores();

  return (
    <Fragment>
      <Header title="Zodiac" />

      <main id="main">
        <div className="submain-container">
          <Nav />

          {activeTab === "Calculator" ? (
            !isValid ? (
              <Form />
            ) : (
              <SubmittedForm />
            )
          ) : (
            <ZodiacList />
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
