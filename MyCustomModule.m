//
//  MyCustomModule.m
//  backbase
//
//  Created by Guilherme Medeiros on 30/05/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "MyCustomModule.h"

@implementation MyCustomModule

RCT_EXPORT_MODULE();

// Available as NativeModules.MyCustomModule.processString
RCT_EXPORT_METHOD(processString:(NSString *)input callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[input stringByReplacingOccurrencesOfString:@"Goodbye" withString:@"Hello"]]);
}

@end