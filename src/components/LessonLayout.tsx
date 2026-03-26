import type { ReactNode } from 'react'

type LessonLayoutProps = {
  title: string
  intro: string
  children: ReactNode
}

function LessonLayout({ title, intro, children }: LessonLayoutProps) {
  return (
    <section className="lesson-layout">
      <div className="lesson-header">
        <h2>{title}</h2>
        <p className="lesson-intro">{intro}</p>
      </div>

      <div className="lesson-card">{children}</div>
    </section>
  )
}

export default LessonLayout