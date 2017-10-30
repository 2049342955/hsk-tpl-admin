const studentApi = {};

import {CacheUtl,ObjUtl} from 'com@';

import Shaco from '@hasaki-ui/hsk-shaco';

const studentDB = CacheUtl.dbFactory().instances('student');

studentApi.add = (contract) => {

};

studentApi.list = (nameQuery, pageIndex = 1, pageSize = 10) => {
    const studentAllList = studentDB.get("list") || (() => {
        const list = [];
        const size = Shaco.number(200, 300);
        for (let i = 0;i < size;i++) {
            let student = {};

            student.id = Shaco.uuid();
            student.number = Shaco.serialNumber("S");
            student.name = Shaco.name();
            student.sex = Shaco.item(["W","M"]);
            student.birthday = Shaco.date(new Date(1994,1,1),new Date(2000,1,1));
            student.nation = Shaco.item([
                "汉族","蒙古族","回族","藏族","维吾尔族","苗族","彝族","壮族","布依族","朝鲜族"
            ]);
            student.college = Shaco.item([
                "哲学社会学院","经济学院","法学院","政治与行政学院","教育学院","文学院","外国语学院",
                "新闻与传播学院","艺术学院","历史文化学院","管理学院","数学与统计学院",
                "物理科学与技术学院","化学化工学院","资源环境学院"
            ]);
            student.subject = Shaco.item([
                "哲学","社会学","经济学","金融学","英语","日语","俄语","德语","法语"
            ]);
            student.clazz = Shaco.item((()=>{
                const list = [];
                for(let i = 13;i<=17;i++){
                    for(let j = 1;j<=6;j++){
                        list.push(i+"级0"+j+"班");
                    }
                }
                return list;
            })());
            student.address = Shaco.address4().full;

            student = ObjUtl.stringifyDateInObject(student,['birthday']);

            list.push(student);
        }

        studentDB.put("list", list);

        return list;
    })();

    let studentList = studentAllList;
    if(nameQuery)
        studentList = studentAllList.filter(student=>{
            return student.name.indexOf(nameQuery) !== -1;
        });

    studentList = studentList.slice((pageIndex - 1) * pageSize,pageIndex * pageSize) || [];


    return {
        studentList,
        pageTotal:studentAllList.length
    };
};

export default studentApi;