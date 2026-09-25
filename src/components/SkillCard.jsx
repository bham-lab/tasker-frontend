export default function SkillCard({skill}) {
  return (
    <div className="card">

      <h4>
{skill.name}
</h4>

<p> {skill.description}</p>
    </div>
  )
}