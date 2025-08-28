import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ViaXpressUI, { slug, toClassPrefix, minifyJson, isValidJson } from "../app/page";

describe("helper functions", () => {
  it("slug() normalizes supplier name", () => {
    expect(slug("Acme Air!")).toBe("acme-air");
    expect(slug("  ")).toBe("");
  });
  it("toClassPrefix() creates PascalCase prefix", () => {
    expect(toClassPrefix("acme air services")).toBe("AcmeAirServices");
    expect(toClassPrefix("")).toBe("ViaXpress");
  });
  it("minifyJson() returns compact JSON or fallback", () => {
    expect(minifyJson("{ \"a\": 1 }")).toBe("{\"a\":1}");
    expect(minifyJson("not json")).toBe("not json");
  });
  it("isValidJson() validates JSON strings", () => {
    expect(isValidJson("{\"a\":1}")).toBe(true);
    expect(isValidJson("oops")).toBe(false);
  });
});

describe("UI smoke tests", () => {
  it("renders headings and buttons", () => {
    render(<ViaXpressUI />);
    expect(screen.getByText(/AI Code Generator/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Download Spec JSON/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Generate Code/i })).toBeInTheDocument();
  });

  it("shows JSON validation status", () => {
    render(<ViaXpressUI />);
    expect(screen.getByText(/JSON/i)).toBeInTheDocument();
  });
});
