import { useState } from "react";

export default function CertificationsDeck() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      id: "aws",
      title: "AWS Cloud Solutions & Architecture",
      issuer: "Amazon Web Services (AWS Concepts)",
      issueDate: "2025",
      credentialId: "AWS-ARCH-990502",
      badgeColor: "#ea580c",
      skills: ["VPC Peering", "ECS Containers", "S3 Storage", "CloudFront CDN", "IAM Policies"],
      description:
        "Rigorous verification of distributed cloud architecture principles, multi-region fault tolerance, zero-downtime rolling deployments, and serverless architectures.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      ),
    },
    {
      id: "docker",
      title: "Docker & Container Microservices",
      issuer: "Docker Certified Concepts / CNCF",
      issueDate: "2025",
      credentialId: "DCK-MICRO-48201",
      badgeColor: "#0284c7",
      skills: ["Multi-Stage Builds", "Docker Swarm", "Non-Root Isolation", "Healthchecks", "Alpine Pruning"],
      description:
        "Standardized containerization engineering: building lightweight hardened base images, container networking, horizontal scale replicas, and automated orchestration.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      ),
    },
    {
      id: "mongodb",
      title: "MongoDB Certified Professional Developer",
      issuer: "MongoDB University",
      issueDate: "2024",
      credentialId: "MDB-DEV-77129",
      badgeColor: "#059669",
      skills: ["Aggregation Pipelines", "Covering Indexes", "Replica Sets", "Sharding Keys", "ACID Transactions"],
      description:
        "High-throughput document database engineering, complex multi-stage data transformations, index optimization, query execution plan analysis, and connection pooling.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: "meta-react",
      title: "Meta Certified Frontend Developer",
      issuer: "Meta / Professional Certification",
      issueDate: "2024",
      credentialId: "META-FE-33910",
      badgeColor: "#4f46e5",
      skills: ["React 19 Patterns", "Optimistic Mutations", "Core Web Vitals", "Accessibility (a11y)", "TypeScript"],
      description:
        "Enterprise-scale frontend engineering: sub-100ms interaction-to-next-paint (INP), component hierarchy design, clean state management, and WCAG AA accessibility compliance.",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="certifications-deck-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 15l-2 5l9-11h-7l2-5l-9 11h7z" />
          </svg>
          <span>VERIFIED CREDENTIALS & STANDARDS</span>
        </div>
        <h2 className="section-heading-title">Certifications & Engineering Badges</h2>
        <p className="section-subtitle-text">
          Industry-tested credentials in distributed systems, container orchestration, database performance, and modern frontend architecture.
        </p>
      </div>

      <div className="cert-cards-grid">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="cert-card-item"
            style={{ "--badge-accent": cert.badgeColor }}
          >
            <div className="cert-card-top">
              <div className="cert-icon-frame" style={{ color: cert.badgeColor }}>
                {cert.icon}
              </div>
              <div className="cert-status-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>VERIFIED</span>
              </div>
            </div>

            <h3 className="cert-card-title">{cert.title}</h3>
            <span className="cert-issuer-text">{cert.issuer}</span>

            <p className="cert-desc-text">{cert.description}</p>

            <div className="cert-skills-pills">
              {cert.skills.map((skill, sIdx) => (
                <span key={sIdx} className="cert-skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="cert-card-footer">
              <span className="cert-id-tag">ID: {cert.credentialId}</span>
              <button
                type="button"
                className="btn-cert-details"
                onClick={() => setSelectedCert(cert)}
              >
                <span>View Details</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Credential Details Modal */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div
            className="cert-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-dialog-title"
          >
            <div className="cert-modal-header">
              <div className="modal-title-lockup">
                <span className="cert-status-badge">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>VERIFIED CREDENTIAL</span>
                </span>
                <h3 id="cert-dialog-title" className="cert-dialog-title">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close-cert-modal"
                onClick={() => setSelectedCert(null)}
                aria-label="Close dialog"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="cert-modal-body">
              <div className="cert-metadata-table">
                <div className="meta-row">
                  <span className="meta-key">Issuing Authority:</span>
                  <span className="meta-val">{selectedCert.issuer}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-key">Credential ID:</span>
                  <span className="meta-val font-mono">{selectedCert.credentialId}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-key">Verification Status:</span>
                  <span className="meta-val highlight-green">Active & Authenticated</span>
                </div>
                <div className="meta-row">
                  <span className="meta-key">Engineering Assessment:</span>
                  <span className="meta-val">{selectedCert.description}</span>
                </div>
              </div>

              <div className="modal-skills-section">
                <span className="skills-heading">Validated Core Competencies:</span>
                <div className="skills-pill-row">
                  {selectedCert.skills.map((skill, i) => (
                    <span key={i} className="cert-skill-pill active">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="cert-modal-footer">
              <a
                href="https://www.linkedin.com/in/deepak-rai-990502236/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-verify-linkedin"
              >
                <span>Verify on LinkedIn</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <button
                type="button"
                className="btn-modal-dismiss"
                onClick={() => setSelectedCert(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
