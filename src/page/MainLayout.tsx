import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import {
  QLayout,
  QHeader,
  QToolbar,
  QBtn,
  QToolbarTitle,
  QPageContainer,
  QSpace,
  QPage,
} from 'quasar'

export const MainLayout = defineComponent({
	setup() {
		// const btnLeftDrawer = ref(false)

		return () => (
      <QLayout view="hHh lpr fFf">
        <QHeader>
          <QToolbar class='bg-white'>
            {/* Allen Web */}
            <QToolbarTitle shrink class='text-primary'>
              Allen Web
            </QToolbarTitle>
            <QSpace />
            <QBtn
              label='UBike'
              no-caps
              unelevated
              icon='directions_bike'
              color='primary'
              to='/ubkie'
            />
            <QBtn
              label='UBike'
              no-caps
              unelevated
              icon='directions_bike'
              color='primary'
              to='/ubkie2'
            />
          </QToolbar>
        </QHeader>
        <QPageContainer>
          <QPage class='q-pa-md'>
					  <RouterView />
          </QPage>
				</QPageContainer>
      </QLayout>
		)
	}
})