"use client";

export default function PhilosophyStory() {
  return (
    <section id="story" className="py-20 md:py-32 bg-surface/50 border-t border-border-subtle">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Founder Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-muted text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Founder’s Note & Origin
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text-primary">
            Why I Built Qurus
          </h2>
          <p className="mt-3 text-text-secondary text-base">
            By <strong className="text-text-primary">Hamdan Khubaib</strong> • Creator of Qurus
          </p>
        </div>

        {/* Editorial Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-14 border border-border shadow-[0_8px_30px_rgba(18,40,36,0.04)] space-y-8 text-text-primary">
          <p className="text-lg sm:text-xl font-normal leading-relaxed text-text-primary font-editorial italic">
            “To be completely honest with you, I was looking for a way to explore and
            understand the Quran directly from its source through translation. But every time I
            tried, something stood in the way.”
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
            Traditional methods simply didn’t fit my reality. As a youngster living in this
            fast-paced world, sitting down with rigid expectations, opening heavy volumes of
            classical commentary, and trying to digest dense academic text felt overwhelming. I
            couldn’t maintain that level of formal study, and like many young people, frustration
            and guilt slowly took over.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
            Meanwhile, look at how we live our lives. Our modern habits—whether it’s Spotify,
            Instagram, or YouTube—rest effortlessly in the palm of our hands. Whenever we have two
            idle minutes waiting in line, sitting in traffic, or riding the train, our thumb
            reflexively opens an app.
          </p>

          {/* Brother's Advice Block */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-surface border-l-4 border-l-primary border border-border relative">
            <div className="text-xs uppercase font-bold tracking-wider text-primary mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>The Advice That Changed Everything</span>
            </div>

            <blockquote className="font-editorial text-lg sm:text-xl text-text-primary leading-relaxed italic">
              “Don’t overthink anything. Just start reading the verses with their translation.
              Whatever framework you use to make sense of the world—whether it is common sense,
              science, philosophy, history, or your own lived experience—you will find something
              coherent.
              <br />
              <br />
              You will find something that sticks with you like a hook in your mind.”
            </blockquote>
            <p className="mt-4 text-xs font-semibold text-text-tertiary text-right">
              — My brother’s words to me
            </p>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
            That statement hit me with the force of clarity. You don’t need to be a scholar or have
            predefined dogmas before words can challenge or move you. When you approach a verse with
            an honest, inquiring mind, it sparks curiosity that stays with you throughout your day.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
            I’m not here to lecture, preach, or push any rigid dogma on anyone. I am a normal person
            who wanted to read the text directly, without bias, and tired of feeling overwhelmed. No
            matter who you are—a teenager wrestling with existential doubts, an agnostic, or someone
            who has never felt connected to organized religion—labels do not matter here.
          </p>

          {/* Author Signature Line */}
          <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                H
              </div>
              <div>
                <div className="text-base font-semibold text-text-primary">
                  Hamdan Khubaib
                </div>
                <div className="text-xs text-text-secondary">
                  Developer & Creator of Qurus
                </div>
              </div>
            </div>

            <a
              href="https://github.com/GitCoder052023"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1.5"
            >
              <span>Follow updates on GitHub</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
