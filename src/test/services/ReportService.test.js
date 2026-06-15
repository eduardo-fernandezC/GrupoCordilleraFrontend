import { vi } from "vitest";

const dashboardApiMock = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock("../../services/api/DashboardApi", () => ({
  default: dashboardApiMock,
}));

import DashboardApi from "../../services/api/DashboardApi";
import { downloadReportPdf } from "../../services/ReportService";

describe("ReportService", () => {
  let createObjectURLMock;
  let revokeObjectURLMock;
  let clickMock;
  let removeMock;
  let createdLink;
  let originalCreateElement;

  beforeEach(() => {
    vi.clearAllMocks();

    createObjectURLMock = vi.fn(() => "blob:report-test");
    revokeObjectURLMock = vi.fn();
    clickMock = vi.fn();
    removeMock = vi.fn();
    createdLink = null;

    originalCreateElement = document.createElement.bind(document);

    Object.defineProperty(window.URL, "createObjectURL", {
      writable: true,
      value: createObjectURLMock,
    });

    Object.defineProperty(window.URL, "revokeObjectURL", {
      writable: true,
      value: revokeObjectURLMock,
    });

    vi.spyOn(document, "createElement").mockImplementation((tagName) => {
      const element = originalCreateElement(tagName);

      if (tagName === "a") {
        createdLink = element;
        element.click = clickMock;
        element.remove = removeMock;
      }

      return element;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("descarga un reporte PDF", async () => {
    const pdfData = new Uint8Array([1, 2, 3]);

    DashboardApi.get.mockResolvedValue({
      data: pdfData,
    });

    await downloadReportPdf(
      "token-test",
      "reports/executive/pdf",
      "reporte-ejecutivo.pdf",
    );

    expect(DashboardApi.get).toHaveBeenCalledWith("reports/executive/pdf", {
      headers: {
        Authorization: "Bearer token-test",
      },
      responseType: "blob",
    });

    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));

    expect(createdLink).not.toBeNull();
    expect(createdLink.href).toBe("blob:report-test");

    expect(createdLink.getAttribute("download")).toBe("reporte-ejecutivo.pdf");

    expect(clickMock).toHaveBeenCalled();
    expect(removeMock).toHaveBeenCalled();

    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:report-test");
  });
});
