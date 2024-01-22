<template>
  <div class="paging" id="paging" :class="customClas">
    <ul id="page">
      <li v-if="prev.link !== '' && prev.dataPage !== ''">
        <span>
          <a :href="prev.link" :data-page="prev.dataPage" @click.prevent="loadContentAtPage(prev.dataPage)">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.68 8.109" style="width: 7px;">
                            <path id="Path_24" data-name="Path 24" class="btnPrev" d="M16.43,16.859,13,13.43,16.43,10" transform="translate(-12.375 -9.375)"/>
                        </svg> -->
            <font-awesome-icon icon="chevron-left" />
          </a>
        </span>
      </li>

      <li v-if="edgeLeft.link !== '' && edgeLeft.dataPage !== ''" class="pc">
        <span
          ><a :href="edgeLeft.link" :data-page="edgeLeft.dataPage" @click.prevent="loadContentAtPage(edgeLeft.dataPage)">{{ edgeLeft.dataPage }}</a></span
        >
      </li>

      <li v-if="dotLeft" class="pc">
        <span><a href="javascript:void(0);" class="text">...</a></span>
      </li>

      <li v-for="(item, idx) in leftSide" :key="`lf${idx}`">
        <span
          ><a :href="item.link" :data-page="item.dataPage" @click.prevent="loadContentAtPage(item.dataPage)">{{ item.dataPage }}</a></span
        >
      </li>

      <li v-if="current.link !== '' && current.dataPage !== ''">
        <span
          ><a class="active" href="javascript:void(0)" :data-page="current.dataPage">{{ current.dataPage }}</a></span
        >
      </li>

      <li v-for="(item, idx) in rightSide" :key="`rt${idx}`">
        <span
          ><a :href="item.link" :data-page="item.dataPage" @click.prevent="loadContentAtPage(item.dataPage)">{{ item.dataPage }}</a></span
        >
      </li>

      <li v-if="dotRight" class="pc">
        <span><a href="javascript:void(0);" class="text">...</a></span>
      </li>

      <li v-if="edgeRight.link !== '' && edgeRight.dataPage !== ''" class="pc">
        <span
          ><a :href="edgeRight.link" :data-page="edgeRight.datpage" @click.prevent="loadContentAtPage(edgeRight.dataPage)">{{ edgeRight.dataPage }}</a></span
        >
      </li>

      <li v-if="next.link !== '' && next.dataPage !== ''">
        <span>
          <a :href="next.link" :data-page="next.dataPage" @click.prevent="loadContentAtPage(next.dataPage)">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.68 8.109" style="width:7px;">
                            <g id="small-left" transform="translate(17.055 17.484) rotate(180)">
                                <path id="Path_24" data-name="Path 24" class="btnNext" d="M16.43,16.859,13,13.43,16.43,10" transform="translate(0 0)"/>
                            </g>
                        </svg> -->
            <font-awesome-icon icon="chevron-right" />
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped></style>
