import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UserTable from "../../../components/organisms/UserTable";

describe("UserTable Component", () => {
  const users = [
    {
      user_id: "auth0|123",
      email: "rocio@test.cl",
      name: "Rocio",
      roles: ["ADMIN"],
    },
  ];

  it("no renderiza tabla cuando no hay usuarios", () => {
    const { container } = render(
      <UserTable
        users={[]}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(
      container.querySelector("table")
    ).not.toBeInTheDocument();
  });

  it("renderiza usuario", () => {
    render(
      <UserTable
        users={users}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    expect(
      screen.getByText("rocio@test.cl")
    ).toBeInTheDocument();
  });

  it("ejecuta onEdit", () => {
    const onEdit = vi.fn();

    render(
      <UserTable
        users={users}
        onEdit={onEdit}
        onDelete={() => {}}
      />
    );

    fireEvent.click(
      screen.getByText("Editar")
    );

    expect(onEdit).toHaveBeenCalled();
  });

  it("ejecuta onDelete", () => {
    const onDelete = vi.fn();

    render(
      <UserTable
        users={users}
        onEdit={() => {}}
        onDelete={onDelete}
      />
    );

    fireEvent.click(
      screen.getByText("Eliminar")
    );

    expect(onDelete).toHaveBeenCalled();
  });

  it("muestra el id al hacer click", () => {
    render(
      <UserTable
        users={users}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    );

    fireEvent.click(
      screen.getByLabelText("Mostrar id")
    );

    expect(
      screen.getByText("auth0|123")
    ).toBeInTheDocument();
  });
});