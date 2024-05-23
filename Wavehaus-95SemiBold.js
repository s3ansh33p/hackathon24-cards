﻿const { jsPDF } = require('jspdf');
var font = 'AAEAAAAPAIAAAwBwRkZUTYWHRwIAAEN4AAAAHEdERUYAKQBvAAAlJAAAAB5HUE9TGd3yagAAJWQAAB4UR1NVQkR2THUAACVEAAAAIE9TLzJoyIqvAAABeAAAAGBjbWFwFXHbbwAAA3wAAAF6Z2FzcP//AAMAACUcAAAACGdseWajuhRIAAAFzAAAGgBoZWFkDYyzswAAAPwAAAA2aGhlYQeLA44AAAE0AAAAJGhtdHjMxxMRAAAB2AAAAaRsb2NhaaVwEgAABPgAAADUbWF4cAC1AEwAAAFYAAAAIG5hbWUksk3mAAAfzAAABFxwb3N0C+gMUQAAJCgAAAD0AAEAAAABAUcca1wFXw889QALA+gAAAAA1VQ3ngAAAADVVDee/9f/DAPuAz8AAAAIAAIAAAAAAAAAAQAAA8T/FAAABBD/1wAAA+4AAQAAAAAAAAAAAAAAAAAAAGkAAQAAAGkASQAKAAAAAAACAAAAAQABAAAAQAAAAAAAAAADAfkCWAAFAAgCigJYAAAASwKKAlgAAAFeADIBLAAAAAAHAAAAAAAAAAAAAAEAAAAAAAAAAAAAAABVS1dOAEAAICISAun/FADbA8QA7AAAAAEAAAAAAfQCnwAAACAAAgHrAFsAAAAAAU0AAAD4AAAA3wBAARsALAKeACwB9wAtAv0ALAI/ADYAfAAYAWEALAFhAAgBZQAYAkYAQADHACIBdQAsALkALAHAACICVQAsATwAIgJLAEgCFwAsAl8AQAJaAEACWAAsAhwAQAJWADYCWAAsAOEAQAEYAEcBzAAsAdoAQAHMAEAB0wAiA0YALALGACICXgBAArgALAJyAEACTQBAAe0AQALuACwCYgBAAN8AQAHaACwCawBAAgEAQANRACICiwBAAuUALAJUAEAC7AAsAl4AQAIjAC4CbAAsApoAQAKhACIEEAAiArUAQAJtACICXgBAAPoAQAG9ACIA+gAIAXYALAJMACwCdQArAnUAQAI1ACsCdQArAlsAKwE7ACECdQArAjoAQADsAEABGP/XAdIAQADfAEADmwBAAjoAQAJZACsCdQBAAnUAKwGTAEAB4AAoAZgAEgI6ADoB9AAcA0gAHAH4ABwB9AAcAg8AKwFZACwBVQCAAVkACAIeACwAuQAsANwALADcACwBbAAsAWwALAEsACwCWAAAAZ4AQAAAAAMAAAADAAAAHAABAAAAAAB0AAMAAQAAABwABABYAAAAEgAQAAMAAgBfAH4AtyAZIB0gIiBEIhL//wAAACAAYQC3IBggHCAiIEQiEv///+P/4v+q4ErgSOBE4CPeVgABAAAAAAAAAAAAAAAAAAAAAAAAAAABBgAAAQAAAAAAAAABAgAAAAIAAAAAAAAAAAAAAAAAAAABAAADBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCAENERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGViYwAAAABnAAAAAAAAYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYABgAGAAYAB0AIgAuAD8AUoBlgGkAdICAAImAjwCSgJYAmQCcgKWAqgC1gMUAzIDYAOaA64D7gQoBDoETgRgBHQEhgS6BRYFMgVeBYYFpAW8BdIF/gYWBiIGPgZaBmoGhgaeBsIG4AcQBzYHcgeEB6AHtAfSB+wIAggaCCwIPAhOCGAIbAiUCLwI5AkKCUQJagmoCcYJ4AoKCiQKMApiCoAKoArICu4LCgtIC24LjAugC74L1gvsDAQMMAw+DGoMlgyiDLAMvgzSDOYM8gzyDQAACgBb/xQBkgLpAAMADwAVABkAIwApADUAOQA9AEgAAAERIREXIxUzFSMVMzUjNTMHIxUzNSMnFSM1FyMVMxUjFTM1MxUjFSMVMxUjFTM1MxUjNSMVMxUjFTMnFSM1FyMVMwcVMzUjNzMBkv7J7KJAQaNBQUFio0EhIYOjQUFiQSGCo2IhIGIgo6OjIWKDo0REo2REIALp/CsD1UIgJCEhJF5mISMjI18gJCFFG0AiFTcWLk9vO29PLy9lIS4gIC4AAgBAAAAAnwKgAAMABwAANwMzAwc1MxVMDF8MTVOtAfP+Da1bWwAAAAIALAHJAO8CbQADAAcAABMnMwczJzMHOAxMDUUNTA0ByaSkpKQAAAACACwAAAJyAlwAGwAfAAABIwczFSMHIzcjByM3IzUzNyM1MzczBzM3MwczBzcjBwJyixuEkB9KH4EfSx9+ihuDjx9LH4EfSx9+8BuBGwF1j0CmpqamQI9BpqamptCPjwABAC3/twHKAugAMAAAExQeAxUUBgcVIzUuAic3HgIzMjY1NC4ENTQ2NzUzFR4CFwcuAiMiBolBXFxBV0dTJU0nDDwLI0chMj0uRlFGLlVIUyVNJww8CyRGITM8AeMgNCcuSzI9WQpmaAgpIA07DBwhLCIbLh4oKUQqPVkKZWcIKSANOwsdHyoABQAs//kC0QJlAAsADwAaACYAMgAAEyImNTQ2MzIWFRQGAwEzAQIyNjU0JiMiBhUUASImNTQ2MzIWFRQGJzI2NTQmIyIGFRQWwz5ZWT4/WFiSAclU/jciQjAwISIvAcg+WVk+P1hYPyEvLiIhLi8BNlk/PllZPj9Z/soCXP2kAX0vIiEvMCAh/kxYPj9YWD8+WEcvICIuLiIgLwAAAgA2//gCLQKpACwANwAAARUjFRQGIyImNTQ+Aj8BLgQ1NDYzMhYfAQcuBCMiBhQWOwE1MxUHNSMiBhUUFjMyNgItPHFkaX0YIyMMDAQLHxcTaUs2VhAQMQEGFBcmFS81PDRzXFx5M1hGRDdDAZZWd1l4aVomPiMYBAUCBhshOSFPWScTE0cCBxMOCzNQMTU1vmg9PDE+SwABABgByQBlAm0AAwAAEyczByUNTQ4ByaSkAAAAAQAs/20BWgMyAB4AAAUuBjQ+BD8BFw4GFRQeAh8BAScFEjQwOikdHCw1NiwODjEFDy4pMyQZLkFAFxeTAwspMVNcgo6CX1E1JgkIMQMLKS5NU3I9U5VdRQ8PAAABAAj/bQE2AzIAHgAAFyc+BDQuAi8BNx4GFRQOBgc7MwkeTDowLUBBFxYxBRI0MDopHREdJikqJh0IkzgFFUxZlqaYYEkQEDEDCysxVF6CRzhoUko3Lh8WBQAAAAIAGAF4AU4CnwAOABMAAAEHFwcnByc3JzcXJzMHNwcXNycjAU50TTU/PzZNcxRvCUIJbokDAwEEAhYdWidlZSdbHD8td3ctUAICBAABAEAAbQIGAjMACwAAARUjFSM1IzUzNTMVAga5VLm5VAF6VLm5VLm5AAAAAAEAIv/OAKYAewADAAAXNzMHIi5WPjKtrQAAAAABACwBJgFJAXoAAwAAASE1IQFJ/uMBHQEmVAAAAQAsAAAAjgB7AAMAADM1MxUsYnt7AAAAAQAiAAABngKgAAMAADMBMwEiAR5e/uECoP1gAAIALP/4AikCpwALABUAAAQiJjU0NjMyHgEVFAcyNjQmIyIGFBYBqPyAgH5VdjT/T1FRT05RUQjAl5jAXphil2eM5IyM5IwAAAEAIgAAAPwCnwAGAAATMxEjEQcnnV9fTywCn/1hAjIwWQAAAAEASAAAAgwCpwAeAAAzJz4FNTQmIyIHJz4DMzIWFRQOAwchFVQFAUk+WT4uSjddOzsFIDdVLl93MFRCVwEBLVEBPzdaSlEcMkJxRwsmMSJ4TixkYkJNAV8AAAAAAQAs//gB6wKnACkAAAUiJic3HgEzMjY1NCYrATUzMjY1NCYjIgYPASc+ATMyFhUUBgceARUUBgEWUoYSQQ9eMzdHX1cbG1dfRzcqUBMTQROFUmVwRSMjRW8IUSBGG0I5LDFERkUwLDovFxdFIFJwTDhXDA1XOExwAAAAAAIAQAAAAiACnwAMAA8AACUVIxUjNSE1ARc1MxEhMxECIFNf/tIBHBJf/uK/91+YmFABtwEB/lgBJwAAAAEAQP/4AhoCnwAcAAAFIiYnNx4BMzI2NTQmIyIGBycRIRUhFTYzMhYUBgEoTIIaVAhVNz5VUTgwVgxQAbv+pDxHYYeGCFM6LBxDRzs9TSoPIwFXX6cff8h5AAAAAgAs//gCLQKnABgAJQAAATIWFRQGIyImNTQ2MzIWFwc0LgEjIgYHNhMyNjU0JiMiBhUUFxYBQV+HiVyEkpd/UoYTQiVUME5hBTh3OlBOPEBPQCIBtn1hZ3nDlJPFUSBGBCkwhGNQ/ptNOj5STUJPJxIAAAABAEAAAAH6AqAABgAAEyEVASMBIUABuv6xawE6/sYCoDr9mgJBAAAAAwA2//gCIAKnABQAHwAoAAAEIiY1NDY3JjU0NjIWFRQGBx4BFRQDMjYnNiYjIgYUFgIyNjQmIgYVFAGb4IU6NFt6znovKzU69TdDAQFDNzhCQgd+S0t+TAhwVDZYGDFhTWZmTS5NFxhYNlQBFzotLTo6Wjr+00BkQkEzMgAAAAACACz/+AItAqcAGAAlAAABMhYVFAYjIiYnNxQeATMyNjcGIyImNTQ2EzI2NTQnJiMiBhUUFgEWhJOXgFOFEkElVDBOYQU5eV+HiWBAUDsjMTpQTQKnw5WTxFEgRgQpMINkUX1iZ3n+kE1CSicWTDo+UgAAAAIAQAAAAKECAAADAAcAABM1MxUDNTMVQGFhYQFapqb+pqurAAIAR//EANYB/QADAAcAABM1MxUDNzMHdWGPKmFEAVanp/5uxcUAAAABACwAfwGMAiEABgAALQE1JRUHFwGM/qABYPr6f7M8s1Z7ewACAEAA1gGaAckAAwAHAAATNSEVBTUhFUABWv6mAVoBgElJqklJAAAAAQBAAH8BoQIhAAYAADc1Nyc1BRVA+voBYX9We3tWszwAAAAAAgAiAAABnQKnAB8AIwAANzU0PgM1NCYjIgYPASc+BDMyFhUUDgMdAQc1MxWgIC4vIC4lKEkRETUDDCksRCJTXiEuLiFfX8c1JkMvKy4YHionFBNDBA4jGhZgOCM+Ly49IivHgoIAAAACACz/2AMbAscANwBCAAABMh4BFRQGIyInBiMiJjU0NjMyFzcXBhUUFjMyNjU0JiMiBhUUFjMyNj8BFw4EIyIuATU0NhMyNjU0JiIGFRQWAaJqsF9bR0grMkpFY2pAQjIMSR8nHSMys3p/rbVxNE4ODTYCCiMqSSlhq2zZhyU6N1A3OQLHbqpbVH1KPHFNUGg0LRB8QC04TThytrJsjK4ZDQw2AwoYExBesGyX3v4URC0vQD8xLkIAAgAiAAACpAKfAAcACgAAISchByMBMwkBMwMCQEv+3EtkARRaART+UtptvLwCn/1hARsBEgAAAAADAEAAAAIoAp8ADAAUABwAADMRMzIWFRQHFhUUBiMDMzI2NCYrAREzMjY0JisBQOp0il1dinSLi0dWVkeLi0dWVkeLAp9tUl8yL2FRbgF2O1o7/hQ7WjoAAQAs//gCjAKnABcAAAUiJhA2MzIWFwcuASMiBhQWMzI2NxcOAQF0lrKyll+QKVcdZj5menpmPmccVymQCMQBJsVUSjY4Qo/ej0M4NkpUAAACAEAAAAJGAp8ACAARAAAzETMyFhUUBiMnMzI2NTQmKwFApKLAwKJFRXKJiXJFAp/AkI/AWoprbIsAAAABAEAAAAINAp8ACwAAASEVMxUjFSEVIREhAg3+kszMAW7+MwHNAkC9X8VfAp8AAAABAEAAAAHBAp8ACQAAASEVMxUjESMRIQHB/t7MzF8BgQJAyl/+6QKfAAAAAAEALP/4Aq4CpwAcAAAFIiY1NDYzMhYXBy4BIyIGFBYzMjY3IzUhESM1BgF0lrKyll+QKVcdZj5menpmU3QPxwErU1IIxZKTxVRKNjhCj96PbVVU/plocAABAEAAAAIiAp8ACwAAATMRIxEhESMRMxEhAcNfX/7cX18BJAKf/WEBHv7iAp/+3gABAEAAAACfAp8AAwAAMxEzEUBfAp/9YQABACz/+AGaAp0ADwAAFyImJzceATMyNjURMxEUBudHZQ9QCTUlLS9fXQhaOiAlNzgqAev+HFZrAAEAQAAAAisCnwALAAABAxMjAwcVIxEzEQECK/TraLxfX18BHQKf/tL+jwEpdbQCn/6gAWAAAAAAAQBAAAABwQKfAAUAADchFSERM58BIv5/X19fAp8AAAABACIAAAMvAp8ADAAAISMLASMLASMTMxsBMwMvX2ygOKBrX5BUoqJVAfD+EAHw/hACn/4oAdgAAAEAQAAAAksCnwAJAAABMxEjAREjETMBAexfYP60X2ABTAKf/WECCv32Ap/99gAAAAIALP/4ArkCpwAJABMAAAUiJhA2MzIWEAYnMjY0JiMiBhQWAXOWsbGWlbGxlWV8fGVme3sIxAEmxcX+2sRZkNyQj96PAAAAAAIAQAAAAigCnwAJABIAADMRMzIWFAYrARURMzI2NTQmKwFA63OKinOMjEdVVUeMAp97uHzwAUpHNzZIAAIALP/wAsACpwANABwAAAUnBiMiJhA2IBYVFAcXJTI3JzcXNjU0JiMiBhQWAoFOTnGWsrIBLLFFSv60OjdEP0gremVme3oQRDvEASbExJN+XUEeKjtFQD1Xb46O3o8AAAIAQAAAAigCnwAOABcAADMRMzIWFRQGBxMjJwcjFREzMjY1NCYrAUDrc4pKQ41hgyWAjEdVVUeMAp97XEJoGf778gLwAUpHNzZIAAABAC7/+AH2AqcAKAAABSImJzceAjMyNjU0LgM1NDY3Mh4BFwcuAiMiBhUUHgMVFAYBFUiCHUEMJlAlOUJIZmZIeGEzbTcRQQ0nTyQ6QkhmZkh5CE0gQQ0hJjAqJDksMlQ3TGgBMSsRQQ4gJjAqJDksMlQ3TWgAAAABACwAAAJAAp8ABwAAARUjESMRIzUCQNtf2gKfX/3AAkBfAAABAED/+AJaAqAADwAABCImNREzERQWMjY1ETMRFAHA5ppfYphiXwiQeQGf/mFQX19QAZ/+YXkAAAEAIgAAAn8CnwAGAAABMwMjAzMTAh5h/WL+Ys0Cn/1hAp/94gAAAAABACIAAAPuAp8ADAAAATMDIwsBIwMzGwEzEwONYdpiqqph22Kqr1evAp/9YQIW/eoCn/34Agj9+AAAAAABAEAAAAJ1Ap8ACwAAISMLASMTAzMXNzMDAnVsrq9s5eNtrKxs4gEB/v8BUQFO/v7+sgAAAQAiAAACTAKfAAgAAAEDESMRAzMXNwJM5l/lbKioAp/+rf60AUwBU/r6AAABAEAAAAIeAp8ACQAAARUBIRUhNQEhNQIe/p4BYv4iAWH+nwKfPP32WT0CClgAAAABAED/bQDyAzIABwAAEyMRMxUjETPyXV2ysgLr/MlHA8UAAAABACIAAAGbAqAAAwAAIQEzAQFA/uJaAR8CoP1gAAAAAAEACP9tALoDMgAHAAATESM1MxEjNbqyXV0DMvw7RwM3RwAAAAEALAGwAUoCnwAGAAATNzMXLwEHLHoreU9AQAGw7+8Bg4MAAAEALP+rAiAAAAADAAAXNSEVLAH0VVVVAAIAK//4AjUB/AANABcAAAEzESM1BiMiJjQ2MzIXAzI2NCYjIgYUFgHWX19JYGuXl2tgSadGXV1GRV5eAfT+DDc/l9aXP/6VYJBgYJBgAAAAAgBA//gCSgLpAA0AFwAAATIWFAYjIicVIxEzETYTMjY0JiMiBhQWAUhrl5drYElfX0ldRl1dRkVeXgH8l9aXPzcC6f7UP/5WYJBgYJBgAAABACv/+AIKAfwAFwAABSImNDYzMhYXBy4BIyIGFBYzMjY3Fw4BAS1rl5drRXYiVRhJJ0ZdXUYnSRhVInYIl9aXRTopJCpgkGAqJCk6RQAAAAIAK//4AjUC6QANABUAAAEzESM1BiMiJjQ2MzIXAjI2NCYiBhQB1l9fSWBrl5drYEntjF1djF0C6f0XNz+X1pc//pVgkGBgkAAAAAACACv//QItAgIAGAAhAAABFQUeATMyNjcXDgMjLgEnJjU0NjceAQUlLgEHDgEHFAIt/msQUjM+YQ1RCCU8XjZRiRsNl2tklP5mATYSWTQ6VwUBFQ5JLjxFJhsVMzkmAWFOJixrlwEBiW83MTwBAlM7CgAAAAEAIQAAARUC8AAXAAABFSMRIxEjNTM1NDYzMhYfAQcmIyIGHQEBFVteOzsyKhcsCwoTExESDQH2Sv5UAaxKjzA7CAQDSAUXIHEAAAACACv/KwI1AfsAHAAoAAABMxEOASMiLgInNx4BMzI2NyM1BiMiJjQ2MzIXAzI2NTQmIyIGFRQWAdZfAZxlNl06JAhMDmE+RlwCAUlga5eXa2BJpkVeXkVGXV0B8/42bZEiNDAVJiZEaD8NP5fWlz/+lGFIR2FhR0lgAAAAAQBAAAACAALpABAAABIyFhURIxE0JiIGFREjETMR27B1YEpuSV9fAfyAXf7hARw6Tk46/uQC6f7NAAAAAgBAAAAArALTAAcACwAAEiImNDYyFhQDETMRjCwgICwgZl8CZx8uHyAs/XkB9P4MAAAAAAL/1/8tANgC0wAHABkAABIiJjQ2MhYUAyInNxceAzMyNjURMxEUBrgsICAsIKI8Ix4DAwoPFgweH19RAmcgLCAfLvynI1ECAgcGBDkrAgT9/FRvAAEAQAAAAbYC6QALAAABBxMjJwcVIxEzETcBtrGxYoYvX1+zAfXY/uPZOaAC6f4w3AAAAAABAEAAAACfAukAAwAAMxEzEUBfAun9FwABAEAAAANhAfwAHwAAATIWFREjETQmIgYVESMRNCYiBhURIxEzFTYzMhYXPgEClFh1YUluSWBKbklfXzxYNlgcG18B/H9d/uABHTpNTjr+5AEdOk1OOv7kAfQ+RjIsKzMAAAAAAQBAAAACAAH8ABAAABIyFhURIxE0JiIGFREjETMV27B1YUluSV9fAfx/Xf7gAR06TU46/uQB9D4AAAAAAgAr//gCLwH8AAcAEQAABCImNDYyFhQHMjY0JiMiBhQWAZjWl5fWl/9FXl5FRl1dCJfWl5jUPmCQYWGQYAAAAAIAQP8MAkoB/QANABcAAAEyFhQGIyInESMRMxU2EzI2NCYjIgYUFgFIa5eXa2BJX19JXUZeXkZFXl4B/ZfWlz/+1ALpNz/+VmCQYWGQYAAAAgAr/wwCNQH9AA0AFQAAATMRIxEGIyImNDYzMhcCMjY0JiIGFAHWX19JYGuXl2tgSe2MXV2MXQH1/RcBLD+X1pc//pVgkGBgkAAAAAEAQAAAAYcB/AAOAAABMhcHJiMiBhURIxEzFTYBMy8lHSgjN0lfXzwB/BVhHk46/uQB9D5GAAAAAQAo//gBuAH8ACsAABciJi8BNx4CMzI2NTQuAzU0NjMyHgIfAQcuAiMiBhUUHgMVFAb3OmcWFz8HGUwlLjhAW1xAY10lRi8kCAk/BxlMJS44QFtcQGMILRcWNwcUIiEdFR8bIkItQVESGhsJCTgHFCIhHRUfGyJCLUFRAAEAEv/4AXcCnQAYAAAlFw4CIyImNREjNTM1NxUzFSMVFBYzMjYBTCsGFUcmQlRHR1+IiCweHS2ESwcWJElJARRWowapVvomLigAAAABADr/+AH6AfQAEQAAATMRIzUGIyImNREzERQWMjY1AZtfXztYWXVhSW5JAfT+DD5Gf10BIP7jOk1OOgABABwAAAHYAfQABgAAATMDIwMzEwF5X65fr19/AfT+DAH0/pQAAAAAAQAcAAADLAH0AAwAAAEzAyMLASMDMxsBMxMCzV+vX3p6X69ff39VgAH0/gwBc/6NAfT+lAFs/pQAAAAAAQAcAAAB3AH0AAsAACEjJwcjNyczFzczBwHcaHh4aKynaHNzaKexsf72qqr2AAAAAQAc/zYB2AH0AAcAAAEzASMTAzMTAXlf/vZfYrVfhAH0/UIBAwG7/r0AAAABACsAAAHlAfQACQAAARUBIRUhNQEhNQHl/toBJv5GASX+2wH0Nf6bWjUBZVoAAAABACz/YAFRAz8AHgAABSImPQE0JiM1MjY9ATQ2MxUiBh0BFAYHHgEdARQWMwFRYl4uNzgtXmI1KyoYGCorNaBdR7o0OEw3NblHXV8eJ8oyRQsKRjHKJx4AAQCA/20A1QMyAAMAABcRMxGAVZMDxfw7AAAAAAEACP9gAS0DPwAeAAAXNTI2PQE0NjcuAT0BNCYjNTIWHQEUFjMVIgYdARQGCDUrKxcXKys1Yl4uNzcuXqBfHifKMUcKCkUyyyYeX11HuTU3TDg0ukddAAABACwCFgHzAqcAGwAAASImIyIGDwEnPgQzMhYzMjY/ARcOBAFnKWUaFSUJCEgCCBseMBkoZxgVKAoJRAIJHB4vAhY/HQ8PJAQOJRsXQRwODisEDCAZFAAAAQAsAAAAjgCmAAMAADM1MxUsYqamAAAAAQAsAfIAsAKfAAMAABM3MwcsPUcuAfKtrQAAAAEALAHyALACnwADAAATNzMHLC5WPgHyra0AAAACACwB8gFAAp8AAwAHAAATNzMHMzczByw+Ry86PkYuAfKtra2tAAAAAgAsAfIBQAKfAAMABwAAEzczBzM3MwcsLlc/Si5WPgHyra2trQAAAAEALAECANQBngADAAATNTMVLKgBApycAAEAQAEmAV4BegADAAATNSEVQAEeASZUVAAAAAAAABYBDgABAAAAAAAAADkAdAABAAAAAAABABQA2AABAAAAAAACAAcA/QABAAAAAAADAB4BQwABAAAAAAAEABQBjAABAAAAAAAFADwCGwABAAAAAAAGABMCgAABAAAAAAAJAA8CtAABAAAAAAAMABgC9gABAAAAAAAQAAgDIQABAAAAAAARAAsDQgADAAEECQAAAHIAAAADAAEECQABACgArgADAAEECQACAA4A7QADAAEECQADADwBBQADAAEECQAEACgBYgADAAEECQAFAHgBoQADAAEECQAGACYCWAADAAEECQAJAB4ClAADAAEECQAMADACxAADAAEECQAQABADDwADAAEECQARABYDKgBDAG8AcAB5AHIAaQBnAGgAdAAgAKkAIAAyADAAMQA3ACAAYgB5ACAARwByAGEAaABhAG0AIABQAGEAdABlAHIAcwBvAG4ALgAgAEEAbABsACAAcgBpAGcAaAB0AHMAIAByAGUAcwBlAHIAdgBlAGQALgAAQ29weXJpZ2h0IKkgMjAxNyBieSBHcmFoYW0gUGF0ZXJzb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuAABXAGEAdgBlAGgAYQB1AHMAIAA5ADUAIABTAGUAbQBpAEIAbwBsAGQAAFdhdmVoYXVzIDk1IFNlbWlCb2xkAABSAGUAZwB1AGwAYQByAABSZWd1bGFyAAAxAC4AMAAwADUAOwBVAEsAVwBOADsAVwBhAHYAZQBoAGEAdQBzAC0AOQA1AFMAZQBtAGkAQgBvAGwAZAAAMS4wMDU7VUtXTjtXYXZlaGF1cy05NVNlbWlCb2xkAABXAGEAdgBlAGgAYQB1AHMAIAA5ADUAIABTAGUAbQBpAEIAbwBsAGQAAFdhdmVoYXVzIDk1IFNlbWlCb2xkAABWAGUAcgBzAGkAbwBuACAAMQAuADAAMAA1ADsAUABTACAAMAAwADEALgAwADAANQA7AGgAbwB0AGMAbwBuAHYAIAAxAC4AMAAuADgAOAA7AG0AYQBrAGUAbwB0AGYALgBsAGkAYgAyAC4ANQAuADYANAA3ADcANQAAVmVyc2lvbiAxLjAwNTtQUyAwMDEuMDA1O2hvdGNvbnYgMS4wLjg4O21ha2VvdGYubGliMi41LjY0Nzc1AABXAGEAdgBlAGgAYQB1AHMALQA5ADUAUwBlAG0AaQBCAG8AbABkAABXYXZlaGF1cy05NVNlbWlCb2xkAABHAHIAYQBoAGEAbQAgAFAAYQB0AGUAcgBzAG8AbgAAR3JhaGFtIFBhdGVyc29uAAB3AHcAdwAuAGcAcgBhAGgAYQBtAHAAYQB0AGUAcgBzAG8AbgAuAGMAbwAuAHoAYQAAd3d3LmdyYWhhbXBhdGVyc29uLmNvLnphAABXAGEAdgBlAGgAYQB1AHMAAFdhdmVoYXVzAAA5ADUAIABTAGUAbQBpAEIAbwBsAGQAADk1IFNlbWlCb2xkAAACAAAAAAAA/4MAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAGkAAAABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAEgATABQAFQAWABcAGAAZABoAGwAcAB0AHgAfACAAIQAiACMAJAAlACYAJwAoACkAKgArACwALQAuAC8AMAAxADIAMwA0ADUANgA3ADgAOQA6ADsAPAA9AD4APwBAAEEAQgBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQDDALYAtwC0ALUAhwC8AO8AAAAB//8AAgABAAAADAAAABYAAAACAAEAAwBoAAEABAAAAAIAAAAAAAEAAAAKABwAHgABREZMVAAIAAQAAAAA//8AAAAAAAAAAQAAAAoAHgAuAAFERkxUAAgABAAAAAD//wABAAAAAWtlcm4ACAAAAAIAAAABAAIABgAUAAIACAAEACIClAO6A+QAAgAIAAcEAAQYD6QREBXAHIodiAACAkgABAAAAYYB3gALABEAAP/U/+j/+//j//b/9v/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/T//v/3gAAAAAAAAAAAAAAAAAAAAAAAP/Z//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4QAA/78AAAAA/9L/0//jAB8AAP/7/8n/8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+f/7f/oAAAAAP+v/+z/8f/j//v/6P/x/5j/8f/3//f/8QAP//YAAAAAAAAAAAAAAAAAAAAAAAAAAP/O/9T/2f/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7v/vwAAAAAAAP+x/+j/9v/Z/+3/8f/iAAAAAAAAAAAAAAAAAAAAAP/7AAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAA4ABAAEAAEABgAGAAMACwALAAQADAAMAAUADgAOAAIADwAPAAkAEAAQAAIAEQARAAYAIAAgAAIAIgAiAAcAPgA+AAoAYQBhAAYAYgBlAAgAaABoAAIAAgARAAMAAwAPAAQABAALAAwADAAJAA8ADwAOABEAEQANABQAFAABABUAFQACABYAFgADABcAFwAEABgAGAAHABoAGgAFABsAGwAGABwAHAAMAB0AHgAKACIAIgAIAGEAYQANAGIAZQAQAAEAEwAEAAYACwAMAA4ADwAQABEAHQAeACAAIgA+AGEAYgBjAGQAZQBoAAIBGAAEAAAAnACuAAUADgAA/97/2f/d/7v/3f/o/9j/0//J/+j/2P/x//YAAP+7/8X/2P+x/8r/4//t/9D/yv/x/+b/6P/FAAD/z//e/9T/xf+o/9T/4v/j/+P/7QAA/8v/3wAAAAD/5v/2/9z/5//1/+j/2P/J//H/yQAA//YAAP/x//b/+//n/+3/+wAA//H/9gAAAAAAAP/7AAEAFAAGAAQAAgAAAAEAAAADAAIAEQAMAAwACwAOAA4ADAAPAA8ACQAQABAADAARABEACAAUABQAAQAVABUABAAWABYAAwAXABcABQAYABgADQAaABoAAgAbABsABgAcABwABwAdAB4ACgAgACAADABhAGEACABoAGgADAABAAUAFAAVABcAGAAZAAIAJAAEAAAAFAAcAAEAAgAAAAEAAQAAAAEAAAABAAsAAQABAAEAAQADAAIAJAAEAAAAFAAcAAEAAgAA/+oAAQAAAAEAAAABABYAAQABAAEAAQAHAAEAEgAEAAAAAQAMAAEALf/2AAEAAQA/AAILagAEAAAKPAqaABUAPgAA/+z/9v+1/9f/YP/J/2X/WP/t/9j/7P/n/7X/8f/N/9f/yf+1/5H/4v/i/9j/h/9f//b/5v/x//H/rv/m//v/5v/2/+v/4f/7/+b/5v/r/+v/9v/r/+v/3P/M/67/x//r/+v/x//c/8f/6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6wAA/+MAAP/m/78AAP/iAAAAAAAA/94AAAAA//H/1AAAAAAAAP/tAAAAAP/o//EAAAAAAAAAAAAAAAD/8QAA/+gAAP/nAAD/9QAAAAAAAP++AAAAAAAAAAD/3f/K//YAAP/xAAD/0//K/93/+wAAAAAAAAAAAAAAAAAA//EAAP/ZAAAAAAAAAAAAAAAA//sAAAAAAAD/9v/bAAAAAP/2AAAAAAAAAAD/8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6wAA/9gAAAAAAAAAAAAAAAAAAAAA//b/8f/Q/97/9gAA//H/9v/7AAAAAP/tAAAAAAAA/+L/uwAAAAD/0wAA/9cAAAAA//EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/uP/jAAAAAP/jAAAAAAAA/+MAAAAAAAAAAP/jAAD/z//o//EAAAAAAAAAAAAAAAD/7QAA/6wAAP/A/6gAAAAA/+YAAP/BAAAAAP+NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/bAAA/47/0wAAAAAAAAAAAAD/+wAA//b/8QAAAAAAAP/XAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sAAP/2//v/6//2//H/7AAA//YAAAAAAAAAAAAAAAD/7AAA//oAAAAAAAAAAAAAAAD/4v/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+sAAAAAAAAAAAAA//sAAAAA//8AAP/iAAD/+wAA/+IAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sAAAAAAAAAAAAAAAAAAP/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/mAAAAAAAAAAAAAAAAAAAAAAAAAAD/0wAAAAAAAAAA/+sAAAAAAAD/4wAA/8z/4QAA/+gAAAAAAAD/nP/r/+T/jQAA/6UAAP+cAAD/yQAAAAD/1/+1/8T/0//SAAD/5gAA/9wAAAAA/9z/3P/XAAD/4QAA/9L/0gAA/9wAAP/X/+b/3AAA/8P/3v/MAAD/wgAAAAAAAAAAAAAAAAAAAAAAAAAA/9QAAP+7/87/V//U/1L/TAAAAAAAAAAAAAAAAAAAAAD/ugAA/+EAAAAA/8kAAAAA/+0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/ywAAAAAAAAAA/6AAAP/YAAD/7QAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAP/2//sAAAAAAAD/9gAA/93/4f/cAAD/9v/kAAD/+wAA//EAAP/7/+b/+wAAAAD/+//x//H/+//xAAAAAP/2AAAAAP/2/+b/3P/m//EAAP/7AAAAAP/iAAD/5//7AAAAAAAAAAAAAAAAAAD/8//r//YAAP+5//v/0//SAAD/3QAA//YAAP/jAAD/+//n/9H/9gAAAAD/8wAAAAD/xP+0AAD/8f/7AAD/6wAA/9j/8f/nAAD/5//3/+v/8QAAAAD/s//s/9z/9gAA/8j/uv/m/+L/9v/s/7j/yP+6//v/nP/C//v/+wAA//EAAAAA//cAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+3/0AAAAAD/9QAAAAAAAAAA/1sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP+IAAAAAAAAAAAAAAAAAAAAAP/2AAD/8f/2/9H/7f/E/7oAAAAAAAAAAAAAAAAAAAAA/9QAAAAA//EAAP/xAAAAAP/nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/rAAD/4gAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAP/UAAD/3f/rAAAAAAAA//sAAAAAAAD/8f/dAAAAAAAA/+v/4wAAAAD/4gAAAAAAAAAAAAAAAAAA//sAAAAAAAAAAP/mAAAAAP/xAAAAAAAAAAAAAAAAAAAAAP/cAAD/0//m/9wAAP/XAAAAAAAAAAAAAAAA/+0AAP+6/9j/5wAA/+P/5wAAAAAAAP/t/4//owAA/4//XQAAAAD/df/j/4QAAAAA/4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAD/lP/m/5n/5v9uAAD/nP+/AAAAAAAAAAAAAP/2/9gAAP/2//EAAAAAAAAAAAAAAAAAAAAAAAAAAP/2//sAAAAAAAAAAAAAAAAAAP/tAAD/7QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//v/+wAAAAD/yQAA/+YAAAAA//EAAAAAAAD/8QAA/8L/3gAAAAAAAAAA//b/awAA/+f/yf/j//b/zP+X//v/6/++AAD/y//hAAD/TP99AAD/8QAFAAAAAAAA/9j/4f/SAAD/2P+V/9gAAAAA/+v/6//rAAAAAAAA//X/2P/2AAD/yf/T/2X/9v9M/+cAAP+9AAAAAAAA/+IAAP/UAAAAAAAAAAAAAAAAAAAAAAAA/64AAAAAAAD/zAAAAAAAAAAAAAAAAAAA/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8wAAP/xAAAAAP/2AAAAAAAAAAAAAP/xAAD/pP/tAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAA/1kAAP/x/4b/yf+bAAAAAP+CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/1gAAAAA/40AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/YAAA/2D/9gAAAAAAAAAAAAD/8QAAAAAAAAAAAAAAAP/xAAAAAAAAAAAAAAAAAAAAAP/rAAAAAAAAAAD/+QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAA/+gAAAAAAAAAAAAAAAAAAAABABIALAARAAsAAAAAAAEAAAAAAAAAEQABAAsAAAAAAAAAAAAAAAAACwAAAAEAAgALAAMABAAFAAYABgAHAAgACQAKAAYACwAMAAsADQAOAA8AEAARABEAEgATABQAAQAEAGUAJAAuACgAIgAsABwALwAqACsAHQANADgADQAZADYAAwASADEAMAAKACUAAwA3ACMAJwAhACEADwANAAsALQADADYAAQADAAEAAQABAAMAAQABABoAAQABAAIAAQADAAEAAwABAAQABQAGAAcABwA6AAgAGwAAAAcAPQAXADsAEQAMABEAEQARAAkAJgAMADkADgAMAAwAEAAQABEAKQARABAAFAAVABYAMgAyADMANAA1AB4APAAfABgAGQATABMAEwATACAAAAANAAIABQASABMAAAAWABYAAgAaABwAAwAjAD0ABgA/AD8AIQACAVgABAAAAKAAzgAIAAkAAP/s/+3/4f/x//sAAAAAAAAAAP/m/+j/1/+RAAAAAAAAAAAAAAAA/+j/6//dAAAACgAAAAAAAP/m/+j/8f/7//sAAP/2AAAAAP/h/+j/wv9QAAAAAAAA/90AAP/7/+0AAP9MAAAAGAAA/5EAAP/2AAD/4f/r//EAAP/2AAAAAAAAAAAAAAAA//sAAAAAAAAAAgAHAAcABwAGAAgACAADAB8AHwACACEAIQABAEEAQQAEAF4AXgAHAGAAYAAFAAEAEgBCAAMABwAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAHAAMABgAHAAYABgAGAAcABgAGAAQABgAGAAUABgAHAAYABwAGAAAAAAAAAAEAAQAAAAAAAAAAAAEAAAAAAAAACAAAAAgACAAIAAAAAAAAAAAAAgAAAAAAAAAAAAgAAAAIAAEACAAHAAgACQAfACEAQQBeAGAAAgR2AAQAAANUA9wAEwAWAAD/8f+u/5T/6//xAAX/3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/UAAD/zP/mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/7z/6wAAAAD////xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4//2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/o/8f/k//2AAr/xP/7//v/Yf/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+P/0v+6/+YAAP/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//m/6r/5v+r/93/pQAA/87/v//Z/+z/8f+1//b/9v/n/8n/3P/CAAAAAAAA/+YAAAAAAAD/6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+gAAAAAAAD/zv+cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAD/4//C/6H/4f/xAAD/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/o/7j/Qf/m//EAAP/mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+3/o/9V/8f/6wAP/8cAAAAAAAAAAP/7AAAAAP/7AAAAAP+q/+v/8QAAAAAAAP/H/4L/8QAAAAD/6wAFAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAA//YAAP/oAAAAAAAA/9j/0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+YAAAAAADQAAP/iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOQAAAAAAAP/rAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAA/+EAAP/C/70AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/cAAAAAgAWAAQABAADAAUABQAKAAYABgAFAAoACgAMAAsACwAGAAwADAAHAA4ADgAEAA8ADwANABAAEAAEABEAEQAIAB0AHgACACAAIAAEACIAIgAJAD4APgAOAEAAQAARAEIAQgASAF0AXQAPAF8AXwAQAGEAYQAIAGIAZQALAGYAZgABAGgAaAAEAAEAEgBKAAIABQAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAIACwAFAAsACwALAAUACwALAAMACwALAAQACwAFAAsABQALAAgACQAVAAYABgAAAAAAAAAAAAYAAAAAAAAABwAPAAcABwAHAA0AEQAPAAAAAQAPAA8AEwATAAcAEAAHABMAEgAMAA4AFAAUAAAACgABABsABAAFAAYACgALAAwADQAOAA8AEAARAB0AHgAgACIAPgBAAEIAXQBfAGEAYgBjAGQAZQBmAGgAAga6AAQAAAWwBeoAEgAoAAD/0P/m/+z/yv/1//v/+//7//b/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//L/2f+w//r/+//nAAD/1wAA/9z/3f/2/+f/zf/Y/+f/8f/K/87/+/+m//cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9T/3QAAAAD/8QAA//IAAAAAAAAAAAAA//b/yf/7AAD/9gAAAAD/0v/7/+wAAP/jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/6P/zAAD/4v/7AAD/8v/7AAAAAP/e//sAAP/o/+gAAAAAAAAAAP/tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/e//YAAAAA//sAAAAAAAD/+wAAAAAAAAAAAAD/+wAA//v/8v/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/zv/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/y//x//EAAAAA//sAAAAA//4AAP/xAAAAAAAA//v/9v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/e//D/2P/Z//T//f/4//b/3//2/+P/9gAA//H/zv/3//v/9v/2//v/+f+6AAD/+//2/7n/3v/7/7T/8f/7/+EAAAAAAAAAAAAAAAAAAAAA//v/7P/O/73/8f/2/+z/8f/S//EAAP/x//v/5v+r//H/8f/0/+H/5gAA/9z/9//mAAD/tf/U/+j/qv/s/9z/4v/Z//H/6//mAAAAAAAAAAAAAP/WAA8AAP/EAAAAAP/+AAAAAP/eAAAAAP+6AAAAAP/iAA8AAP+XAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/e/+v/7f/E//YAAAAAAAD/9gAA/+YAAAAAAAD/3QAA//v/9P/7/9cAAP++AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/zv/o//EAAP/o//r/3f/OAAD/5wAA//EAAP/TAAD/9v/ZAAD/8gAAAAAAAAAA/8sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/zAAD/zv/7AAD/+gAA//YAAAAA//sAAP/7AAAAAAAA//wAAP/tAAD/4v/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/84AAP/M/+H////2AAD//wAAAAAAAP/w/7YAAAAA//EAAAAA/6EAAAAAAAD/1wAA/+YAAAAAAAD/zAAAAAD/9gAAAAAAAP/N//b/0gAAAAD/0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/YAAAAAP/mAAD/9QAAAAAAAP+1AAAAAP+rAAAAAP/iAAAAAP+NAAD/8QAAAAD//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+L/+//tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAQwAaAAcACAAAAAYAAQACAAMABwAEABEABQAGAAcABwAIAAgAAAAJAAoACwAMAA0ADQAOAA8AEAABAAQAZQAVACAAJgAAAAAAAAAQAAAABAAfABkAFAAZAA4AGAAAABsAIQAcACUAAAAAAAAAAAAkAAsACwAAABkAAAAWAAAAGAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAaAAAAAAAAAAAAGgAAACIAJwACAAYAAgACAAIADAAFAAYADQABAAYABgAHAAcAAgAXAAIABwARABIACAAJAAkAEwADAAoAAAAAACMAHQAOAA8ADwAPAA8AAAAAABkAAgACAEMAUgAAAFQAXAAQAAIA8gAEAAAAYABwAAQACgAA/+f/4//n/9f/8QAAAAAAAAAAAAD/4//tAAD/5gAA/8n/7QAAAAAAAP/U//H/6AAAAAD/7QAA//YAAAAA//QAAAAA/9f/6//xAAAAAP/xAAEAFQAFAAIAAAABAAAAAwACABUAEgASAAQAEwATAAEAGQAZAAEAIwAjAAEAJAAkAAQAJgAmAAEAKgAqAAEALQAtAAkAMAAwAAUAMgAyAAEANAA0AAEAOQA6AAYAPwA/AAYAQwBDAAMARQBHAAMATABMAAIATwBQAAcAUQBRAAMAUwBTAAMAVABUAAcAWABZAAgAAQAEABUAFwAYABkAAgBEAAQAAAAUABwAAQACAAD//wABAAAAAQAAAAEAJQARAAEAAAABAAEAAQAAAAEAAQAAAAEAAQAAAAEAAAABAAAAAQABAAEAAwAAAAEAAAAA2t7XxQAAAADVVDeeAAAAANVUN54=';
var callAddFont = function () {
this.addFileToVFS('Wavehaus-95SemiBold-normal.ttf', font);
this.addFont('Wavehaus-95SemiBold-normal.ttf', 'Wavehaus-95SemiBold', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
