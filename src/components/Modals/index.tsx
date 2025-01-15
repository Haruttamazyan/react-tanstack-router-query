
import { useModalContext } from '../../providers/ModalProvider'
import * as Modals from './components'

export const ModalRoot = () => {
  const { modals } = useModalContext()


  return modals.map(({ name, id, props }) => {
    const Component = Modals[name]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error/
    return <Component key={id} {...props} />
  })
}
