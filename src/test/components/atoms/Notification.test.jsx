import { render } from "@testing-library/react";
import NotificationContainer from "../../../components/atoms/Notification";

describe("Notification Component", () => {
  it("renderiza correctamente", () => {
    const { container } = render(
      <NotificationContainer />
    );

    expect(container).toBeTruthy();
  });

  it("crea el contenedor toast", () => {
    const { container } = render(
      <NotificationContainer />
    );

    expect(
      container.querySelector(".Toastify")
    ).toBeInTheDocument();
  });
});