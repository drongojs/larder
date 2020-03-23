import { RouterLink } from 'vue-component-router';
import Vue from 'vue';

const list = [
  [ 40, 'g', '2020-03-04' ],
  [ 1, 'kg', '2020-05-03' ],
  [ 500, 'g', '2020-01-01' ],
];

const ViewRow = ({
  props: {
    quantity,
    unit,
    date,
  },
  listeners: {
    click,
  },
}) => (
  <md-list-item onClick={click}>
    <div class="md-list-item-text">
      <span>{quantity}{unit}</span>
    </div>
    <div class="md-list-item-text">
      <span>{date}</span>
    </div>
  </md-list-item>
);

const EditRow = ({
  props: {
    quantity,
    expiry,
  },
  listeners,
}) => (
  <md-list-item>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100">
        <md-field>
          <label for="quantity">Quantity</label>
          <md-input id="quantity" type="number" value={quantity}/>
        </md-field>
      </div>
      <div class="md-layout-item md-xsmall-size-100">
        <md-datepicker
          mdOpenOnFocus={false}
          mdImmediately={true}
          value={expiry}
        >
          <label for="expiry">Expiry date</label>
        </md-datepicker>
      </div>
      <div class="md-layout-item">
        <div class="md-layout md-alignment-center">
          <md-button class="md-layout-item" style="min-width:0">
            <md-icon>delete</md-icon>
          </md-button>
          <md-button onClick={listeners.click} class="md-layout-item" style="min-width:0">
            <md-icon>clear</md-icon>
          </md-button>
          <md-button class="md-primary md-layout-item" style="min-width:0">
            <md-icon>done</md-icon>
          </md-button>
        </div>
      </div>
    </div>
  </md-list-item>
);

export default Vue.extend({
  props: {
    id: String,
  },
  data() {
    return {
      editing: -1,
    };
  },
  render() {
    return (
      <div class="md-layout">
        <div class="md-layout-item md-size-100">
          <span class="md-title">
            {this.id}
          </span>
          <span class="md-caption" style="margin-left:1rem;">
            1.5kg
          </span>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field>
            <label for="larder_search_add">Add...</label>
            <md-input id="larder_item_add"/>
            <md-button type="submit" class="md-primary">
              <md-icon>add</md-icon>
            </md-button>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-list>
            {list.map(([ quantity, unit, date ], i) => {
              if (this.editing === i) {
                return (
                  <EditRow
                    quantity={quantity}
                    unit={unit}
                    date={date}
                    onClick={() => this.editing = -1 }
                  />
                );
              }

              return (
                <ViewRow
                  quantity={quantity}
                  unit={unit}
                  date={date}
                  onClick={() => this.editing = i }
                />
              );
            })}
          </md-list>

        </div>
        <div class="md-layout-item md-size-100">
          <RouterLink to="/larder">
            <md-button class="md-raised">
              <md-icon>clear</md-icon>
              <span class="md-medium-hide">Back</span>
            </md-button>
          </RouterLink>
          <md-button >
            <md-icon>add_shopping_cart</md-icon>
          </md-button>
        </div>
      </div>
    );
  },
});
