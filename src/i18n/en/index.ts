import about from './about'
import blog from './blog'
import common from './common'
import contact from './contact'
import hero from './hero'
import projects from './projects'
import notFound from './404'

export default {
	notFound,
	...about,
	...blog,
	...common,
	...contact,
	...hero,
	...projects
} as const
