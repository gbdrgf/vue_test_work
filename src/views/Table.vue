<template>
  <div>
    <div class="page-title">
      <h3>Записи</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <modal v-if="showModal" @close="showModal = false" @save="save"/>
    <section>
      <table>
        <thead>
        <tr>
          <th>
            <a href="#"  @click="sort()">#</a>
          </th>
          <th>Название</th>
          <th>Дата</th>
          <th>
            Статус
            <button class="btn-small btn" :disabled="editable" @click="editStatus()">
              <span>Изменить</span>
            </button>
          </th>
          <th>
            <label>
            <input type="checkbox" @click="changeAll" class="filled-in" v-model="chooseAll" />
            <span></span>
            </label>
          </th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="item in showItems" :key="item.number">
          <td>{{item.number}}</td>
          <td @click="editName(item)">{{item.name}}</td>
          <td>{{item.date}}</td>
          <td>{{item.status}}</td>

          <td>
            <label>
              <input type="checkbox" @click="change(item)" class="filled-in" v-model="item.active" />
              <span></span>
            </label>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import Modal from "@/components/Modal"
export default {
  components: {
    Modal
  },
  data: () => ({
    showModal: false,
    items: [
      { number: 1, name: 'Название1', date: '03.02.21', status: 'Готово', active: false },
      { number: 2, name: 'Название2', date: '12.01.21', status: 'В процессе', active: false },
      { number: 23, name: 'Название3', date: '11.01.21', status: 'Подтверждено', active: false },
      { number: 3, name: 'Название4', date: '23.01.21', status: 'Готово', active: false },
      { number: 43, name: 'Название5', date: '13.01.21', status: 'Готово', active: false },
    ],
    defaultItems: Object.freeze([
    { number: 1, name: 'Название1', date: '03.02.21', status: 'Готово', active: false },
    { number: 2, name: 'Название2', date: '12.01.21', status: 'В процессе', active: false },
    { number: 23, name: 'Название3', date: '11.01.21', status: 'Подтверждено', active: false },
    { number: 3, name: 'Название4', date: '23.01.21', status: 'Готово', active: false },
    { number: 43, name: 'Название5', date: '13.01.21', status: 'Готово', active: false },
  ]),
    chooseAll: false,
    sorted: false,
    asc: true,
    editItem: {},
    editable: true,
    changeStatus: false,
    changeName: false
  }),
  computed: {
    showItems() {
      return this.sorted?this.items:this.defaultItems
    }
  },

  methods: {
    changeAll(){
      this.editable = !this.editable
      this.chooseAll = !this.chooseAll
      this.showItems.forEach(item => {
        item.active = this.chooseAll
      })
    },
    change(item){
      item.active = !item.active
      let count = 0
      this.showItems.forEach(item => {
        if (item.active === true) {
          this.editable = false
          count++
        }
      })
      if (count === 0){
        this.editable = true
      }
    },
    editStatus() {
      this.changeStatus = true
      this.showModal = true
    },
    save(newText) {
      if (this.changeName) {
        this.showModal = false
        this.editItem.name = newText
        this.changeName = false
      }
      if (this.changeStatus) {
        this.showModal = false
        this.showItems.forEach(item => {
          if (item.active) {
            item.status = newText
          }
        })
        this.changeStatus = false
      }

    },
    editName(item) {
      this.changeName = true
      this.showModal = true
      this.editItem = item
    },
    sort(){
      if (this.asc) {
        this.items.sort(function (a, b) {
          if (a.number > b.number) {
            return 1;
          }
          if (a.number < b.number) {
            return -1;
          }
          return 0;
        })
        this.asc = false
      } else {
        this.items.sort(function (a, b) {
          if (a.number < b.number) {
            return 1;
          }
          if (a.number > b.number) {
            return -1;
          }
          return 0;
        })
        this.asc = true
      }
      this.sorted = true
    }
  }
}
</script>