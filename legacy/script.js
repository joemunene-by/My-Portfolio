const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggleBtn.textContent =
    document.body.classList.contains("light") ? "🌑" : "🌙";
});
const terminalBody = document.getElementById("terminal-body");
const terminalInput = document.getElementById("terminal-input");

const commands = {
  help: "Available commands: whoami, skills, projects, clear",
  whoami: "Joe Munene — Full-Stack Developer & Cybersecurity Engineer",
  skills: "Web • Cybersecurity • AI • Secure Systems",
  projects: "DNS Lookup Tool | AI Coding Assistant | Automation Systems",
};

terminalInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = terminalInput.value.trim();
    terminalBody.innerHTML += `<div>$ ${cmd}</div>`;
    terminalBody.innerHTML += `<div>${commands[cmd] || "command not found"}</div>`;
    terminalInput.value = "";
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach(section => observer.observe(section));
