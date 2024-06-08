import { create } from 'apisauce'

const api = create({
    baseURL: 'http://192.168.85.173:1337/api',
    headers: { "X-API-Key":"e7a46ac32b2004b232b32dd13a014247e95d64319f6368f860610d99a9686592dbd07273354a6aded01bd446cb002bb92fe76e2560e83af41347472f54736b0b28c624038bb0ccde1d2526bdf17ef9bf87cd532d1e6890039b15a54cbd71531de227ffb6603dce2a32c9f363a42e7b32ca7f519fc5592a420d4e149f4dff35d8" },
  })
  
const getSlider=()=>api.get('/sliders?populate=*');
const getCourseList=(type)=>api.get('/course-lists?filters[Type][$eqi]='+type+'&populate=*');


export default{
    getSlider,
    getCourseList
}