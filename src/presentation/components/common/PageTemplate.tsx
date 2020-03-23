import {
  RouterLink,
} from 'vue-component-router';

const PageTemplate = ({ children }) => (
  <md-app>
    <md-app-toolbar class="md-primary">
      <md-tabs
        class="md-primary"
        md-alignment="centered"
        scopedSlots={{
          'md-tab': (scope) => (
            <RouterLink to={scope.tab.data.to}>
              <md-icon>{scope.tab.icon}</md-icon>
            </RouterLink>
          ),
        }}
      >
        <md-tab md-icon="receipt" md-label="Larder" md-template-data={{ to: '/larder' }}/>
        <md-tab md-icon="shopping_cart" md-label="Shopping" md-template-data={{ to: '/shopping' }}/>
        <md-tab md-icon="bookmark" md-label="Recipes" md-template-data={{ to: '/recipes' }}/>
      </md-tabs>
    </md-app-toolbar>

    <md-app-content>
      <div class="md-layout md-alignment-top-center">
        <div class="md-layout-item md-small-size-100 md-medium-size-75 md-size-50">
          {children}
        </div>
      </div>
    </md-app-content>
  </md-app>
);

export default PageTemplate;
