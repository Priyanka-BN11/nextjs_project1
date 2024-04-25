import { graph ,auth, config } from '@grafbase/sdk'
import LinkedIn from 'next-auth/providers/linkedin'
import { title } from 'process'



const g = graph.Standalone();

const User = g.model('User', {
  name: g.string().length({min:2, max:20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description:g.string(),
  githubUrl:g.url().optional(),
  LinkedInUrl:g.url().optional(),
  projects:g.relation(()=> Project).List().optional(),
});
const Project = g.model('Project', {
  title: g.string().length({min:3}),
  description: g.string(),
  image:g.url(),
  liveSiteUrl:g.url(),
  githubUrl:g.url(),
  category:g.string().search(),
  createdBy:g.relation(()=> User),

});
export default config({
  schema:g
})
