import SkillCard from './SkillCard'


const skill = [{
  name: "HTML",
  description: "I have good experience on html"
},
  {
    name: "CSS",
    description: "I have good experience on CSs"
  },
  {
    name: "JS",
    description: "I have good experience on JS"
  }]


export default function Skills() {
  return (

    <>
      <h2>my skills are</h2>
      {
      skill.map((s) => (
        <SkillCard skill={s} key={s.name} />

      )
      )}


    </>
  )
}