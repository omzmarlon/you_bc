package com.youbc.controllers;

import com.google.protobuf.InvalidProtocolBufferException;
import com.youbc.generated.protobuf.DemoProto.Demo;
import static com.youbc.generated.schema.tables.TestTable.TEST_TABLE;
import com.youbc.utils.ProtobufUtil;
import org.jooq.DSLContext;
import org.jooq.Record3;
import org.jooq.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class DemoController {
    private DSLContext dslContext;

    @Autowired
    public DemoController(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    @RequestMapping(path = "/demoProto", method = RequestMethod.GET)
    public String demoProto() throws InvalidProtocolBufferException {
        Demo.Builder builder = Demo.newBuilder();
        builder.setUsername("marlon");
        builder.setPassword("password");
        return ProtobufUtil.protobufToJSON(builder.build());
    }

    @RequestMapping(path = "/demoJooq", method = RequestMethod.GET)
    public String demoJooq() {
        Random random = new Random(2);
        dslContext.insertInto(TEST_TABLE)
                .set(TEST_TABLE.ID, random.nextInt())
                .set(TEST_TABLE.FIRST_NAME, "Marlon")
                .set(TEST_TABLE.LAST_NAME, "Ou")
                .execute();
        Result<Record3<Integer, String, String>> result =
                dslContext.select(TEST_TABLE.ID, TEST_TABLE.FIRST_NAME, TEST_TABLE.LAST_NAME)
                .from(TEST_TABLE)
                .fetch();
        return result.toString();
    }
}
