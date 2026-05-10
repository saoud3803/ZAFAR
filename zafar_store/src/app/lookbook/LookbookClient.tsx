"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Link from "next/link";

const SUPABASE_BASE =
  "https://slqwuwrnlfsnibhcoiwt.supabase.co/storage/v1/object/public/website";

const HERO_IMAGE = `${SUPABASE_BASE}/Header%202.png`;

const editorials = [
  {
    id: 1,
    season: "SS 2025",
    title: "Quiet\nRiot",
    subtitle: "Tailored.",
    description:
      "A meditation on restraint. The body as architecture. Cotton pressed to the weight of stone.",
    image: HERO_IMAGE,
    href: "/collections/men",
    cta: "Shop Men",
    layout: "left",
  },
  {
    id: 2,
    season: "SS 2025",
    title: "Soft\nPower",
    subtitle: "Redrawn.",
    description:
      "Femininity as precision. Every seam deliberate. Every drape an argument.",
    image: HERO_IMAGE,
    href: "/collections/women",
    cta: "Shop Women",
    layout: "right",
  },
  {
    id: 3,
    season: "SS 2025",
    title: "The\nEssential",
    subtitle: "Redefined.",
    description:
      "Our best-selling forms, re-examined under the season's hardest light.",
    image: HERO_IMAGE,
    href: "/collections/best-sellers",
    cta: "Best Sellers",
    layout: "left",
  },
  {
    id: 4,
    season: "FW 2025",
    title: "New\nDrop",
    subtitle: "Arrived.",
    description:
      "The newest additions. Uncompromising weight. Structured silence.",
    image: HERO_IMAGE,
    href: "/collections/new-drop",
    cta: "New Drop",
    layout: "right",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] },
  }),
};

function EditorialBlock({ item, index }: { item: (typeof editorials)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const isLeft = item.layout === "left";

  return (
    <section
      ref={ref}
      className={`relative flex flex-col ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      } min-h-[90vh] overflow-hidden`}
    >
      {/* Image panel */}
      <div className="relative w-full lg:w-[58%] overflow-hidden bg-zinc-100">
        <motion.div style={{ y: imageY }} className="absolute inset-[-8%] will-change-transform">
          <img
            src={item.image}
            alt={item.title.replace("\n", " ")}
            className="w-full h-full object-cover object-[center_top]"
          />
          <div className="absolute inset-0 bg-zinc-950/10" />
        </motion.div>

        {/* Season tag */}
        <motion.span
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="absolute top-8 left-8 font-ui-mono text-[9px] tracking-[0.3em] uppercase text-white/80 mix-blend-screen"
        >
          {item.season}
        </motion.span>

        {/* Index */}
        <motion.span
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="absolute bottom-8 right-8 font-ui-mono text-[11px] text-white/50 mix-blend-screen"
        >
          0{index + 1} / 0{editorials.length}
        </motion.span>
      </div>

      {/* Text panel */}
      <div
        className={`relative w-full lg:w-[42%] flex flex-col justify-center px-10 py-20 lg:px-16 xl:px-24 bg-[#FAFAFA] ${
          isLeft ? "" : ""
        }`}
      >
        <motion.p
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-ui-mono text-[9px] tracking-[0.35em] uppercase text-zinc-400 mb-8"
        >
          {item.season}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-serif italic text-[64px] md:text-[88px] leading-[0.85] tracking-tighter text-zinc-950 mb-3 whitespace-pre-line"
        >
          {item.title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-ui-mono text-[11px] tracking-[0.25em] uppercase text-zinc-500 mb-10"
        >
          {item.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-8 h-[1px] bg-zinc-300 mb-10"
        />

        <motion.p
          variants={fadeUp}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-body-md text-zinc-500 leading-relaxed max-w-xs mb-14 text-[15px]"
        >
          {item.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Link
            href={item.href}
            className="group inline-flex items-center gap-3 font-ui-mono text-[10px] tracking-[0.25em] uppercase text-zinc-950 hover:text-zinc-500 transition-colors duration-500"
          >
            {item.cta}
            <span className="block w-8 h-[1px] bg-current transition-all duration-500 group-hover:w-14" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function LookbookClient() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[85vh] flex items-end overflow-hidden bg-zinc-950">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="ZAFAR Lookbook"
            className="w-full h-full object-cover object-[center_20%] opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-16 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-ui-mono text-[9px] tracking-[0.4em] uppercase text-white/50 mb-6"
          >
            SS 2025 — Editorial
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif italic text-[80px] md:text-[120px] lg:text-[160px] leading-[0.82] tracking-tighter text-white"
          >
            Look
            <br />
            book
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-ui-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mt-6"
          >
            Volume I
          </motion.p>
        </div>
      </section>

      {/* Intro line */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-20 border-b border-zinc-200">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-serif italic text-[22px] md:text-[28px] text-zinc-500 max-w-2xl leading-snug"
        >
          "Clothing is the language of a body that refuses to be silent."
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="font-ui-mono text-[9px] tracking-widest uppercase text-zinc-400 mt-4 block"
        >
          — ZAFAR, Spring / Summer 2025
        </motion.span>
      </div>

      {/* Editorial blocks */}
      {editorials.map((item, i) => (
        <EditorialBlock key={item.id} item={item} index={i} />
      ))}

      {/* Closing CTA */}
      <section className="relative bg-zinc-950 py-40 px-8 lg:px-16 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-ui-mono text-[9px] tracking-[0.4em] uppercase text-white/40 mb-8"
          >
            The Full Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            viewport={{ once: true }}
            className="font-serif italic text-[60px] md:text-[90px] text-white leading-[0.85] tracking-tighter mb-12"
          >
            Shop Now
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/collections/men"
              className="font-ui-mono text-[10px] tracking-[0.25em] uppercase text-white border border-white/30 hover:border-white hover:bg-white hover:text-zinc-950 transition-all duration-500 px-10 py-4"
            >
              Shop Men
            </Link>
            <Link
              href="/collections/women"
              className="font-ui-mono text-[10px] tracking-[0.25em] uppercase text-white border border-white/30 hover:border-white hover:bg-white hover:text-zinc-950 transition-all duration-500 px-10 py-4"
            >
              Shop Women
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
