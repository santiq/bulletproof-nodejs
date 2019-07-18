
import { Router } from 'express'
import * as Agendash from 'agendash'
import { Container } from 'typedi'

export default (app: Router) => {
	const agendaInstance = Container.get('agendaInstance')

	app.use('/dash', Agendash(agendaInstance))
}



