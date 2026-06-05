import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UserForm from "../../../components/organisms/UserForm";

describe("UserForm Component", () => {
  const user = {
    user_id: "auth0|123",
    name: "Rocio",
    email: "rocio@test.cl",
    password: "",
  };

  it("renderiza los datos del usuario", () => {
    render(
      <UserForm
        user={user}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    expect(
      screen.getByDisplayValue("Rocio")
    ).toBeInTheDocument();
  });

  it("actualiza el nombre", () => {
    render(
      <UserForm
        user={user}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Nombre del usuario"),
      {
        target: { value: "Martin" },
      }
    );

    expect(
      screen.getByDisplayValue("Martin")
    ).toBeInTheDocument();
  });

  it("ejecuta onCancel", () => {
    const onCancel = vi.fn();

    render(
      <UserForm
        user={user}
        errors={{}}
        onSave={() => {}}
        onCancel={onCancel}
      />
    );

    fireEvent.click(
      screen.getByText("Cancelar")
    );

    expect(onCancel).toHaveBeenCalled();
  });

  it("ejecuta onSave", () => {
    const onSave = vi.fn();

    render(
      <UserForm
        user={user}
        errors={{}}
        onSave={onSave}
        onCancel={() => {}}
      />
    );

    fireEvent.click(
      screen.getByText("Guardar")
    );

    expect(onSave).toHaveBeenCalled();
  });

  it("en modo edición la contraseña no es requerida", () => {
    render(
      <UserForm
        user={user}
        errors={{}}
        onSave={() => {}}
        onCancel={() => {}}
      />
    );

    const passwordInput =
      screen.getByPlaceholderText(
        "Dejar en blanco para conservar"
      );

    expect(passwordInput).not.toHaveAttribute(
      "required"
    );
  });
});