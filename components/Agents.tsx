'use client'
// components/Agents.tsx — "Four agents. One polished clone." section

import { agents } from "@/lib/data";
import Image from "next/image";

export default function Agents() {
  return (
    <section className="agents" id="agents" aria-labelledby="agents-heading">
      <div className="agents-inner">
        {/* Header */}
        <div className="agents-header">
          <div className="reveal-left">
            <div className="section-tag">Powered by AI Agents</div>
            <h2 id="agents-heading">
              Four agents.
              <br />
              One polished clone.
            </h2>
          </div>
          <p className="reveal-right">
            CloneOS runs a set of specialized AI agents that handle the creative
            and operational heavy lifting — from scripting your performance to
            managing global licensing.
          </p>
        </div>

        {/* Cards */}
        <div className="agents-grid" role="list">
          {agents.map((agent, i) => (
            <article
              key={agent.title}
              className={`agent-card reveal reveal-delay-${i + 1}`}
              role="listitem"
            >
              <div className="agent-image-wrap">
                <Image
                  src={agent.image}
                  alt={agent.tag}
                  width={640}
                  height={420}
                  className="agent-image"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
              </div>
              <div className="agent-tag">{agent.tag}</div>
              <h3>{agent.title}</h3>
              <p>{agent.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
