"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Download, Rocket, Sparkles, Terminal, Wand2 } from "lucide-react";
import React, { useMemo, useState } from "react";

/* -----------------------------------------------------------------------------
   Tiny UI primitives (inline)
----------------------------------------------------------------------------- */
const cn = (...xs: Array<string | false | undefined>) => xs.filter(Boolean).join(" ");

function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("rounded-2xl border border-white/10 bg-white/5 text-white", props.className)} />;
}
function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-4", props.className)} />;
}
function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-4 pt-0", props.className)} />;
}
function CardFooter(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn("p-4 pt-0", props.className)} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" };
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", ...p }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition",
      variant === "secondary" ? "bg-white/10 hover:bg-white/20 text-white border border-white/10" : "bg-indigo-600 hover:bg-indigo-500 text-white",
      className
    )}
    {...p}
  />
));
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...p }, ref) => (
  <input ref={ref} className={cn("w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none", className)} {...p} />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...p }, ref) => (
  <textarea ref={ref} className={cn("w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none", className)} {...p} />
));
Textarea.displayName = "Textarea";

function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} className={cn("text-sm text-slate-200", props.className)} />;
}

/* Tabs (Radix wrappers) */
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(({ className, ...p }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn("inline-flex h-10 items-center rounded-xl bg-white/5 p-1 text-white", className)} {...p} />
));
TabsList.displayName = "TabsList";
const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(({ className, ...p }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn("inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm data-[state=active]:bg-white/20", className)}
    {...p}
  />
));
TabsTrigger.displayName = "TabsTrigger";
const TabsContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(({ className, ...p }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("mt-2", className)} {...p} />
));
TabsContent.displayName = "TabsContent";

/* Select (Radix) */
const Select = SelectPrimitive.Root;
const SelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>>(
  ({ className, ...p }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-left",
        "inline-flex items-center justify-between gap-2",
        className
      )}
      {...p}
    />
  )
);
SelectTrigger.displayName = "SelectTrigger";
const SelectValue = SelectPrimitive.Value;
const SelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, children, ...p }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("z-50 min-w-[8rem] overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur p-1 shadow-xl", className)}
        position="popper"
        sideOffset={8}
        {...p}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = "SelectContent";
const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...p }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-white",
        "outline-none focus:bg-white/10 data-[state=checked]:bg-white/20",
        className
      )}
      {...p}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = "SelectItem";

/* -----------------------------------------------------------------------------
   Helpers
----------------------------------------------------------------------------- */
export const slug = (s: string) => (s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const toClassPrefix = (s: string) =>
  (s || "ViaXpress")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
export const minifyJson = (s: string) => {
  try {
    return JSON.stringify(JSON.parse(s));
  } catch {
    return s?.trim() || "{}";
  }
};
export const isValidJson = (s: string) => {
  try {
    JSON.parse(s);
    return true;
  } catch {
    return false;
  }
};

/* -----------------------------------------------------------------------------
   Page
----------------------------------------------------------------------------- */
const PROJECT_TYPES = ["flights", "hotels", "visa", "holidays"] as const;

export default function ViaXpressUI() {
  const [projectType, setProjectType] = useState<string>("flights");
  const safeProjectType =
    PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number]) ? projectType : "flights";

  const [supplierName, setSupplierName] = useState<string>("Paximum");
  const [basePackage, setBasePackage] = useState<string>("com.via.integrations.acme");

  // endpoints
  const [searchEndpoint, setSearchEndpoint] = useState<string>("/v1/flight-offers/search");
  const [repriceEndpoint, setRepriceEndpoint] = useState<string>("/v1/flight-offers/reprice");
  const [bookingEndpoint, setBookingEndpoint] = useState<string>("/v1/orders");

  // payloads
  const [searchRQ, setSearchRQ] = useState<string>(`{
  "origin": "DEL",
  "destination": "BOM",
  "departDate": "2025-09-12",
  "adults": 1
}`);
  const [searchRS, setSearchRS] = useState<string>(`{
  "currency": "INR",
  "totalAmount": 4312.00,
  "itineraries": []
}`);
  const [repriceRQ, setRepriceRQ] = useState<string>(`{
  "offerId": "abc123"
}`);
  const [repriceRS, setRepriceRS] = useState<string>(`{
  "currency": "INR",
  "totalAmount": 4312.00,
  "fees": []
}`);
  const [bookRQ, setBookRQ] = useState<string>(`{
  "offerId": "abc123",
  "travellers": [{ "firstName": "Asha", "lastName": "Verma" }]
}`);
  const [bookRS, setBookRS] = useState<string>(`{
  "pnr": "V1AXYZ",
  "status": "CONFIRMED"
}`);

  const supplierSlug = useMemo(() => slug(supplierName) || "supplier", [supplierName]);
  const classPrefix = useMemo(() => toClassPrefix(supplierName), [supplierName]);
  const projectSlug = useMemo(
    () => `${supplierSlug}-${safeProjectType}-integration`,
    [supplierSlug, safeProjectType]
  );

  const prompt = useMemo(() => {
    const domain = safeProjectType;
    return (
      `Create a ${domain} Searcher + ProcessEngine for supplier ${classPrefix}.\n` +
      `Endpoints: search=${searchEndpoint}, reprice=${repriceEndpoint}, book=${bookingEndpoint}.\n` +
      `Search Request: ${minifyJson(searchRQ)}\n` +
      `Search Response: ${minifyJson(searchRS)}\n` +
      `Reprice Request: ${minifyJson(repriceRQ)}\n` +
      `Reprice Response: ${minifyJson(repriceRS)}\n` +
      `Booking Request: ${minifyJson(bookRQ)}\n` +
      `Booking Response: ${minifyJson(bookRS)}\n` +
      `Use Java 1.8, OkHttp, Jackson. Generate ${classPrefix}${domain.charAt(0).toUpperCase() + domain.slice(1)}Searcher, ${classPrefix}${domain
        .charAt(0)
        .toUpperCase() + domain.slice(1)}ProcessEngine, ${classPrefix}ApiClient, and DTOs.`
    );
  }, [
    safeProjectType,
    classPrefix,
    searchEndpoint,
    repriceEndpoint,
    bookingEndpoint,
    searchRQ,
    searchRS,
    repriceRQ,
    repriceRS,
    bookRQ,
    bookRS,
  ]);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const allJsonValid =
    isValidJson(searchRQ) &&
    isValidJson(searchRS) &&
    isValidJson(repriceRQ) &&
    isValidJson(repriceRS) &&
    isValidJson(bookRQ) &&
    isValidJson(bookRS);

  /* ---------------------------------------------------------------------------
     Client-side ZIP generator (adds .java files)
  --------------------------------------------------------------------------- */
  async function handleGenerate() {
    setBusy(true);
    setError(null);
    setOk(null);
    try {
      const JSZip = (await import("jszip")).default;

      const finalBase = basePackage || `com.via.integrations.${supplierSlug}`;
      const pkgPath = finalBase.replace(/\./g, "/");
      const ClassBase = toClassPrefix(supplierName) + safeProjectType.charAt(0).toUpperCase() + safeProjectType.slice(1);

      const zip = new JSZip();

      // README + spec
      zip.file(`${projectSlug}/README.md`,
`# ${projectSlug}
Base package: ${finalBase}

Generated by ViaXpress UI.
`);
      zip.file(`${projectSlug}/SPEC.prompt.txt`, prompt);

      // Simple Java sources
      const apiClient = `package ${finalBase};

import java.io.IOException;

public class ${ClassBase}ApiClient {
  public String getBaseUrl() { return "https://api.example.com"; }

  public String search(String requestJson) throws IOException {
    // TODO: call ${searchEndpoint}
    return "{\\"ok\\":true}";
  }

  public String reprice(String requestJson) throws IOException {
    // TODO: call ${repriceEndpoint}
    return "{\\"ok\\":true}";
  }

  public String book(String requestJson) throws IOException {
    // TODO: call ${bookingEndpoint}
    return "{\\"ok\\":true}";
  }
}
`;

      const searcher = `package ${finalBase};

public class ${ClassBase}Searcher {
  private final ${ClassBase}ApiClient client;

  public ${ClassBase}Searcher(${ClassBase}ApiClient client) {
    this.client = client;
  }

  public String search(String requestJson) throws Exception {
    // transform request if needed, validate inputs
    return client.search(requestJson);
  }
}
`;

      const engine = `package ${finalBase};

public class ${ClassBase}ProcessEngine {
  private final ${ClassBase}ApiClient client;

  public ${ClassBase}ProcessEngine(${ClassBase}ApiClient client) {
    this.client = client;
  }

  public String reprice(String requestJson) throws Exception {
    return client.reprice(requestJson);
  }

  public String book(String requestJson) throws Exception {
    return client.book(requestJson);
  }
}
`;

      const dto = `package ${finalBase}.dto;

public class Offer {
  public String currency;
  public double totalAmount;

  public Offer() {}

  public Offer(String currency, double totalAmount) {
    this.currency = currency;
    this.totalAmount = totalAmount;
  }
}
`;

      // Add files to zip under src/main/java/...
      const baseDir = `${projectSlug}/src/main/java/${pkgPath}`;
      zip.file(`${baseDir}/${ClassBase}ApiClient.java`, apiClient);
      zip.file(`${baseDir}/${ClassBase}Searcher.java`, searcher);
      zip.file(`${baseDir}/${ClassBase}ProcessEngine.java`, engine);
      zip.file(`${projectSlug}/src/main/java/${pkgPath}/dto/Offer.java`, dto);

      // Build the zip and download
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectSlug}.zip`;
      a.click();
      URL.revokeObjectURL(url);

      setOk(`Generated: ${projectSlug}.zip`);
    } catch (e: any) {
      setError(`Generation failed: ${e.message || e}`);
    } finally {
      setBusy(false);
    }
  }

  function downloadSpec() {
    const spec = {
      projectType: safeProjectType,
      supplierName,
      basePackage: basePackage || `com.via.integrations.${supplierSlug}`,
      endpoints: { search: searchEndpoint, reprice: repriceEndpoint, book: bookingEndpoint },
      payloads: {
        search: { rq: JSON.parse(minifyJson(searchRQ)), rs: JSON.parse(minifyJson(searchRS)) },
        reprice: { rq: JSON.parse(minifyJson(repriceRQ)), rs: JSON.parse(minifyJson(repriceRS)) },
        book: { rq: JSON.parse(minifyJson(bookRQ)), rs: JSON.parse(minifyJson(bookRS)) },
      },
      derived: { projectSlug, classPrefix, supplierSlug },
      prompt,
    };
    const blob = new Blob([JSON.stringify(spec, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectSlug}-spec.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black text-slate-100">
      {/* Futuristic particle layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.25) 0, transparent 40%)," +
            "radial-gradient(1.5px 1.5px at 70% 40%, rgba(255,255,255,.2) 0, transparent 40%)," +
            "radial-gradient(1.8px 1.8px at 40% 70%, rgba(255,255,255,.15) 0, transparent 40%)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:py-16">
        <header className="flex flex-col items-center gap-3 text-center">
          <motion.h1
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            <span className="bg-gradient-to-r from-fuchsia-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              ViaXpress
            </span>{" "}
          </motion.h1>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="max-w-2xl text-sm text-slate-300 md:text-base"
          >
            Describe your supplier integration. We’ll generate a clean Java 1.8 scaffold you can drop into the production repo.
          </motion.p>
        </header>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Left: Form */}
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/5 border-white/10 bg-white/5">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-fuchsia-300">
                <Wand2 className="h-5 w-5" />
                <span>Project Setup</span>
              </div>
              <p className="text-sm text-slate-300">Pick your domain, name your supplier, and paste request/response samples.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select value={safeProjectType} onValueChange={setProjectType}>
                    <SelectTrigger className="bg-black/30">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flights">Flights</SelectItem>
                      <SelectItem value="hotels">Hotels</SelectItem>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="holidays">Holidays</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Supplier Name</Label>
                  <Input className="bg-black/30" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} placeholder="AcmeAir" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Base Package</Label>
                <Input
                  className="bg-black/30"
                  value={basePackage}
                  onChange={(e) => setBasePackage(e.target.value)}
                  placeholder={`com.via.integrations.${supplierSlug}`}
                />
                <p className="text-xs text-slate-400">
                  Suggested: <code>{`com.via.integrations.${supplierSlug}`}</code>
                </p>
              </div>

              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-black/30">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="reprice">Reprice</TabsTrigger>
                  <TabsTrigger value="book">Booking</TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="space-y-3 pt-3">
                  <div className="space-y-2">
                    <Label>Search Endpoint</Label>
                    <Input className="bg-black/30" value={searchEndpoint} onChange={(e) => setSearchEndpoint(e.target.value)} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Search Request (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(searchRQ) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={searchRQ}
                        onChange={(e) => setSearchRQ(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(searchRQ) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Search Response (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(searchRS) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={searchRS}
                        onChange={(e) => setSearchRS(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(searchRS) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reprice" className="space-y-3 pt-3">
                  <div className="space-y-2">
                    <Label>Reprice Endpoint</Label>
                    <Input className="bg-black/30" value={repriceEndpoint} onChange={(e) => setRepriceEndpoint(e.target.value)} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Reprice Request (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(repriceRQ) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={repriceRQ}
                        onChange={(e) => setRepriceRQ(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(repriceRQ) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Reprice Response (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(repriceRS) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={repriceRS}
                        onChange={(e) => setRepriceRS(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(repriceRS) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="book" className="space-y-3 pt-3">
                  <div className="space-y-2">
                    <Label>Booking Endpoint</Label>
                    <Input className="bg-black/30" value={bookingEndpoint} onChange={(e) => setBookingEndpoint(e.target.value)} />
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Booking Request (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(bookRQ) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={bookRQ}
                        onChange={(e) => setBookRQ(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(bookRQ) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Booking Response (JSON)</Label>
                      <Textarea
                        className={cn("min-h-[140px] bg-black/30", isValidJson(bookRS) ? "border-emerald-600/40" : "border-rose-600/40")}
                        value={bookRS}
                        onChange={(e) => setBookRS(e.target.value)}
                      />
                      <p className="text-xs text-slate-400">{isValidJson(bookRS) ? "Looks good" : "Invalid JSON"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-xs text-slate-400">
                Project: <code>{projectSlug}</code>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="bg-white/10 hover:bg-white/20" onClick={downloadSpec}>
                  <Download className="mr-2 h-4 w-4" /> Download Spec JSON
                </Button>
                <Button disabled={busy || !allJsonValid} onClick={handleGenerate} className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-2 h-4 w-4" />
                    {busy ? "Generating..." : "Download Code"}
                  </span>
                  <motion.span
                    initial={{ x: "-120%" }}
                    animate={{ x: busy ? "120%" : "-120%" }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                    className="absolute inset-y-0 -mx-12 w-1/2 skew-x-[-12deg] bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-400/40 to-cyan-300/0"
                  />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Right: Prompt preview & status */}
          <Card className="backdrop-blur supports-[backdrop-filter]:bg-white/5 border-white/10 bg-white/5">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-300">
                <Terminal className="h-5 w-5" />
                <span>Prompt Preview</span>
              </div>
              <p className="text-xs text-slate-300">This is what the generator will use to scaffold your code.</p>
            </CardHeader>
            <CardContent>
              <pre className="max-h-[520px] overflow-auto rounded-lg bg-black/40 p-4 text-xs leading-relaxed text-slate-200">{prompt}</pre>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="h-4 w-4 text-fuchsia-300" /> {allJsonValid ? "All JSON validated" : "Fix invalid JSON before generating"}
              </div>
              {error && <span className="text-rose-400 text-xs">{error}</span>}
              {ok && <span className="text-emerald-400 text-xs">{ok}</span>}
            </CardFooter>
          </Card>
        </motion.div>

        <footer className="mx-auto mt-6 w-full max-w-6xl text-center text-xs text-slate-400">
          Built for <span className="font-semibold text-slate-200">Via Systems</span> · Java 1.8 · OkHttp · Jackson · Etc.
          {/* <span className="text-fuchsia-300">framer-motion</span> */}
        </footer>
      </div>
    </div>
  );
}
