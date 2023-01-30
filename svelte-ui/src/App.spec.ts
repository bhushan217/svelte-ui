import { render, screen, fireEvent } from "@testing-library/svelte";
import "@testing-library/jest-dom/extend-expect";
//import { fireEvent } from "@testing-library/svelte/node_modules/@testing-library/dom";
import App from "./App.svelte";

describe("Routing", () => {
  const setup = (path) => {
    window.history.pushState({}, "", path);
    render(App);
  };

  it.each`
    path               | pageTestId
    ${"/"}             | ${"home-page"}
    ${"/svelte-ui/counter"}       | ${"counter-component"}
  `("displays $pageTestId when path is $path", ({ path, pageTestId }) => {
    setup(path);
    setTimeout(() => {
      const page = screen.queryByTestId(pageTestId);
      console.debug(page)
      expect(page).toBeInTheDocument();
    },200)
  });
  

});