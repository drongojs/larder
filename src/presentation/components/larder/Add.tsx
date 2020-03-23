import { RouterLink } from 'vue-component-router';

const fieldClass = 'md-layout-item md-size-50 md-xsmall-size-100';

const Add = () => (
  <div>
    <form class="md-layout md-alignment-center">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">
            Add
          </div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class={fieldClass}>
              <md-autocomplete mdOptions={[ 'apple', 'banana', 'pear' ]} mdOpenOnFocus={false}>
                <label>Name</label>
              </md-autocomplete>
            </div>

            <div class={fieldClass}>
              <md-autocomplete mdOptions={[ 'fruit' ]} mdOpenOnFocus={false}>
                <label>Category</label>
              </md-autocomplete>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class={fieldClass}>
              <md-field>
                <label for="quantity">Quantity</label>
                <md-input id="quantity" type="number"/>
              </md-field>
            </div>

            <div class={fieldClass}>
              <md-field>
                <label for="unit">Unit</label>
                <md-select id="unit">
                  <md-optgroup label="Weight">
                    <md-option value="g">grams (g)</md-option>
                    <md-option value="kg">kilgrams (kg)</md-option>
                  </md-optgroup>
                  <md-optgroup label="Volume">
                    <md-option value="ml">millilitres (ml)</md-option>
                    <md-option value="l">litres (l)</md-option>
                  </md-optgroup>
                </md-select>
              </md-field>
            </div>
          </div>
          
          <div class="md-layout md-gutter">
            <div class={fieldClass}>
              <md-datepicker mdOpenOnFocus={false} mdImmediately={true}>
                <label for="expiry">Expiry date</label>
              </md-datepicker>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <RouterLink to="/larder">
            <md-button class="md-raised">
              <md-icon>clear</md-icon>
              <span class="md-hide-medium">Cancel</span>
            </md-button>
          </RouterLink>
          <md-button type="submit" class="md-primary md-raised">
            <md-icon>done</md-icon>
            <span class="md-medium-hide">Ok</span>
          </md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
);

export default Add;
