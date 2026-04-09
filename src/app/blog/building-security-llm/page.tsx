"use client"

import Link from "next/link"
import { ArrowLeft, Clock, Calendar } from "lucide-react"

export default function BuildingSecurityLLM() {
  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Nav bar */}
      <div className="sticky top-0 z-50 bg-bg-dark/90 backdrop-blur-xl border-b border-border-color">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">Mar 2026</span>
            </div>
            <span className="text-border-color">|</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Why I&apos;m Building a Cybersecurity LLM from Scratch
          </h1>

          <div className="flex flex-wrap gap-2">
            {["AI", "Cybersecurity", "PyTorch"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary font-mono text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-white/80 leading-relaxed text-[17px]">
          <p className="text-xl text-white/90 leading-relaxed">
            Most language models aren&apos;t built for security work. I decided to change that by training one from scratch — no pretrained weights, no wrappers, every component written by hand. Here&apos;s why, and what I&apos;ve learned so far.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Problem with Generic Models</h2>

          <p>
            If you&apos;ve ever asked GPT-4 or Claude to help you analyze a CVE, write a Burp Suite plugin, or reason through a CTF challenge, you&apos;ve probably noticed something: the answers are decent but surface-level. The models know <em>about</em> security, but they don&apos;t think <em>like</em> security researchers.
          </p>

          <p>
            That&apos;s not a criticism — these are general-purpose models trained on everything from cooking recipes to quantum physics. Security is a fraction of their training data. They lack the deep pattern recognition that comes from being immersed in vulnerability descriptions, exploit chains, and attack methodologies.
          </p>

          <p>
            I wanted a model that speaks security natively. One that understands what a use-after-free looks like, why ASLR matters, and how a SQL injection escalates from data leak to full RCE. Not a model that can define these terms — one that can <em>reason</em> about them.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why from Scratch?</h2>

          <p>
            The obvious path would be to fine-tune an existing model. Take Llama or Mistral, throw security data at it, done. But I didn&apos;t want to do that, for a few reasons:
          </p>

          <ul className="space-y-3 list-none pl-0">
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">1.</span>
              <span><strong className="text-white">Understanding.</strong> I wanted to understand every layer of the transformer — not just how to call <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-primary">model.generate()</code>, but how attention actually works, how loss propagates, how learning rate schedules affect convergence. Building from scratch forces that understanding.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">2.</span>
              <span><strong className="text-white">Control.</strong> When you fine-tune someone else&apos;s model, you inherit their architectural decisions. Their tokenizer. Their biases. Starting from zero means every decision is intentional — I chose 6 layers, 8 attention heads, 512 embedding dimensions because I tested alternatives, not because someone else decided.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold mt-0.5">3.</span>
              <span><strong className="text-white">The learning is the point.</strong> I&apos;m a CS student. The goal isn&apos;t just to have a model at the end — it&apos;s to deeply understand how language models work. There&apos;s no better way than building one yourself.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Architecture</h2>

          <p>
            GhostLM is a decoder-only transformer — the same family as GPT. The current version, <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-primary">ghost-tiny</code>, has about 14.5 million parameters. That&apos;s tiny by modern standards (GPT-4 is rumored to be over a trillion), but it&apos;s enough to learn meaningful patterns in security text.
          </p>

          <div className="bg-bg-card border border-border-color rounded-xl p-6 my-8 font-mono text-sm">
            <div className="text-text-muted mb-2">// ghost-tiny config</div>
            <div className="space-y-1">
              <div><span className="text-primary">layers:</span> 6</div>
              <div><span className="text-primary">attention_heads:</span> 8</div>
              <div><span className="text-primary">embedding_dim:</span> 512</div>
              <div><span className="text-primary">context_length:</span> 1024</div>
              <div><span className="text-primary">vocab_size:</span> 50,261</div>
              <div><span className="text-primary">parameters:</span> ~14.5M</div>
            </div>
          </div>

          <p>
            Every component is hand-written in PyTorch: the multi-head causal self-attention, the pre-norm transformer blocks, the cosine learning rate scheduler with linear warmup, weight-tied output projections. No <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-primary">transformers</code> library, no <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-primary">nn.TransformerDecoder</code> — just raw tensor operations and matrix math.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Training Data</h2>

          <p>
            This is where it gets interesting. GhostLM is trained on a curated corpus of cybersecurity text:
          </p>

          <ul className="space-y-2 list-none pl-0">
            <li className="flex gap-3">
              <span className="text-primary">&#x2022;</span>
              <span><strong className="text-white">CVE descriptions</strong> — thousands of vulnerability entries from the National Vulnerability Database, covering everything from buffer overflows to authentication bypasses</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">&#x2022;</span>
              <span><strong className="text-white">CTF writeups</strong> — detailed walkthroughs of Capture The Flag challenges, showing real problem-solving methodology</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">&#x2022;</span>
              <span><strong className="text-white">Security research</strong> — papers, blog posts, and technical analyses from the security community</span>
            </li>
          </ul>

          <p>
            The data pipeline handles deduplication, quality filtering, and tokenization using a GPT-2 BPE tokenizer extended with security-specific tokens.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Where Things Stand</h2>

          <p>
            GhostLM has completed its 10,000-step Phase 1 training on CPU. The loss curves looked healthy throughout — training loss dropped from ~4.5 to ~2.25, and validation loss trended down to ~2.75. Phase 2 (100K steps on Mac Mini M4) is up next.
          </p>

          <p>
            Is it good? Not yet. The perplexity is still high compared to GPT-2 (expected — GPT-2 has 8x the parameters and was trained on orders of magnitude more data). But the model is learning. It&apos;s picking up security vocabulary, sentence structure, and basic patterns in how vulnerabilities are described.
          </p>

          <p>
            Phase 2 will push training to 100,000 steps on better hardware (Apple Silicon M4), with a larger context window and more data. That&apos;s where I expect real capability to emerge.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What I&apos;ve Learned So Far</h2>

          <p>
            Building a language model from scratch teaches you things that no tutorial or course can:
          </p>

          <ul className="space-y-3 list-none pl-0">
            <li className="flex gap-3">
              <span className="text-primary font-bold">&#x2192;</span>
              <span><strong className="text-white">Attention is everything, literally.</strong> The self-attention mechanism is beautiful in its simplicity — it&apos;s just learned weighted averages — but the emergent behavior from stacking these layers is genuinely surprising.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">&#x2192;</span>
              <span><strong className="text-white">Data quality beats data quantity.</strong> Early experiments with noisy, unfiltered security text produced garbage. Curating the dataset carefully made more difference than any hyperparameter change.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">&#x2192;</span>
              <span><strong className="text-white">Training on CPU is pain.</strong> But it forces you to be efficient with your architecture and deliberate with your experiments. Every training run costs hours, so you learn to think before you run.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">&#x2192;</span>
              <span><strong className="text-white">Small models can still be useful.</strong> You don&apos;t need billions of parameters to build something that understands a specific domain. A 14.5M parameter model trained on focused data can develop real expertise.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What&apos;s Next</h2>

          <p>
            The roadmap is clear: finish phase 1 training, benchmark the model, then scale up on better hardware. Long-term, I want GhostLM to be a tool that security researchers actually use — for CVE triage, for understanding exploit chains, for learning about vulnerabilities in a way that&apos;s more interactive than reading documentation.
          </p>

          <p>
            The code is fully open source. If you&apos;re interested in the intersection of AI and cybersecurity, or if you just want to see how a transformer is built from scratch, check out the{" "}
            <a
              href="https://github.com/joemunene-by/GhostLM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GhostLM repository
            </a>.
          </p>

          <div className="border-t border-border-color mt-12 pt-8">
            <p className="text-text-muted text-sm italic">
              This is the first in a series of posts about building GhostLM. Next up: the technical deep dive into the attention mechanism and why I chose pre-norm over post-norm transformer blocks.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
