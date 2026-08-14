import { ArrowUp, Github, Linkedin } from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wordmark" aria-hidden="true">
          DEEPAK RAI
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Deepak Rai. Built with React &amp; a lot of coffee.</p>
          <p>
            <a
              className="link"
              href="https://github.com/deepakrai9813"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <Github width={14} height={14} /> GitHub
            </a>
            {" · "}
            <a
              className="link"
              href="https://www.linkedin.com/in/deepak-rai-990502236"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <Linkedin width={14} height={14} /> LinkedIn
            </a>
          </p>
          <a href="#top" className="btn btn-ghost" style={{ padding: "0.6rem 1.1rem" }}>
            Back to top <ArrowUp width={15} height={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}
