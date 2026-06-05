const toastMock = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: toastMock,
}));

import { toast } from "react-toastify";
import {
  notifyError,
  notifyInfo,
  notifySuccess,
} from "../../services/NotificationService";

describe("NotificationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra notificación de éxito", () => {
    notifySuccess("Guardado correctamente");

    expect(toast.success).toHaveBeenCalledWith("Guardado correctamente");
  });

  it("muestra notificación de error", () => {
    notifyError("Ocurrió un error");

    expect(toast.error).toHaveBeenCalledWith("Ocurrió un error");
  });

  it("muestra notificación informativa", () => {
    notifyInfo("Información importante");

    expect(toast.info).toHaveBeenCalledWith("Información importante");
  });
});
