import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useDebounce from "../../hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna valor inicial inmediatamente", () => {
    const { result } = renderHook(() =>
      useDebounce("Rocio")
    );

    expect(result.current).toBe("Rocio");
  });

  it("actualiza valor después del delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: "A",
        },
      }
    );

    rerender({
      value: "B",
    });

    expect(result.current).toBe("A");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("B");
  });

  it("no actualiza antes del delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: "A",
        },
      }
    );

    rerender({
      value: "B",
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("A");
  });

  it("respeta delay personalizado", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      {
        initialProps: {
          value: "A",
        },
      }
    );

    rerender({
      value: "C",
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe("C");
  });
});