"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Check, Copy, ExternalLink, IndianRupee, Smartphone } from "lucide-react";
import styles from "./support.module.css";

const upiId = "rishusinghrk045-1@okaxis";
const payeeName = "Rishi Singh";

const tipOptions = [
  { amount: 50, label: "Chai" },
  { amount: 100, label: "Debug fuel" },
  { amount: 200, label: "Biryani" },
  { amount: 500, label: "Domain" },
  { amount: 1000, label: "Hosting" },
  { amount: 2000, label: "Boss move" },
];

function buildUpiUrl(amount?: number) {
  const params = new URLSearchParams({
    pa: upiId,
    pn: payeeName,
    cu: "INR",
  });

  if (amount && amount > 0) {
    params.set("am", String(amount));
  }

  return `upi://pay?${params.toString()}`;
}

export function SupportPayment() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [qrSrc, setQrSrc] = useState("");
  const [copied, setCopied] = useState(false);

  const activeAmount = useMemo(() => {
    const parsedCustom = Number(customAmount);
    if (customAmount && Number.isFinite(parsedCustom) && parsedCustom > 0) {
      return Math.floor(parsedCustom);
    }

    return selectedAmount ?? undefined;
  }, [customAmount, selectedAmount]);

  const upiUrl = useMemo(() => buildUpiUrl(activeAmount), [activeAmount]);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(upiUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 280,
      color: {
        dark: "#071e22",
        light: "#ffffff",
      },
    }).then((url) => {
      if (!cancelled) setQrSrc(url);
    });

    return () => {
      cancelled = true;
    };
  }, [upiUrl]);

  const copyUpiId = async () => {
    await navigator.clipboard.writeText(upiId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const selectAmount = (amount: number) => {
    setCustomAmount("");
    setSelectedAmount((current) => (current === amount ? null : amount));
  };

  return (
    <section className={styles.grid} aria-label="UPI support options">
      <div className={`${styles.panel} ${styles.qrPanel}`}>
        <div className={styles.panelEyebrow}>UPI Web Shooter</div>
        <h2>Scan and support</h2>
        <div className={styles.qrFrame}>
          {qrSrc ? (
            <Image
              src={qrSrc}
              alt="UPI QR code for Rishi Singh"
              width={252}
              height={252}
              unoptimized
            />
          ) : (
            <div className={styles.qrLoading} />
          )}
        </div>
        <button className={styles.upiId} type="button" onClick={copyUpiId}>
          <span>{upiId}</span>
          {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        </button>
        <div className={styles.actionRow}>
          <a className={`${styles.primaryAction} spider-sense-pulse`} href={upiUrl}>
            <Smartphone size={17} aria-hidden="true" />
            Open UPI
          </a>
          <button className={styles.secondaryAction} type="button" onClick={copyUpiId}>
            <Copy size={16} aria-hidden="true" />
            {copied ? "Copied" : "Copy ID"}
          </button>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.amountPanel}`}>
        <div className={styles.panelEyebrow}>Choose Power Level</div>
        <h2>Pick an amount</h2>
        <div className={styles.amountGrid}>
          {tipOptions.map((option) => (
            <button
              key={option.amount}
              className={`${styles.amountButton} ${selectedAmount === option.amount && !customAmount ? styles.selected : ""}`}
              type="button"
              onClick={() => selectAmount(option.amount)}
            >
              <span>
                <IndianRupee size={15} aria-hidden="true" />
                {option.amount}
              </span>
              <small>{option.label}</small>
            </button>
          ))}
        </div>
        <label className={styles.customAmount}>
          <span>Custom amount</span>
          <input
            type="number"
            min="1"
            inputMode="numeric"
            placeholder="Enter amount in INR"
            value={customAmount}
            onChange={(event) => {
              setSelectedAmount(null);
              setCustomAmount(event.target.value);
            }}
          />
        </label>
        <p className={styles.helperText}>
          The QR updates instantly. On mobile, Open UPI should hand off to your installed payment app.
        </p>
      </div>

      <div className={`${styles.panel} ${styles.notePanel}`}>
        <div className={styles.panelEyebrow}>Why Support</div>
        <p>
          Contributions help cover hosting, domains, API experiments, project demos, and the late-night build sessions
          behind this portfolio.
        </p>
        <a className={styles.textLink} href="mailto:rishisingh700@gmail.com">
          Send a note
          <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>

      <div className={`${styles.panel} ${styles.webPanel}`} aria-hidden="true">
        <div className={styles.signalImageFrame}>
          <Image
            src="/easter-eggs/cutu.jpg"
            alt="Cute Spider-Man support mascot"
            fill
            sizes="260px"
            className={styles.signalImage}
          />
        </div>
        <div className={styles.signalText}>
          <strong>Spider Signal</strong>
          <small>UPI support online</small>
        </div>
      </div>
    </section>
  );
}
